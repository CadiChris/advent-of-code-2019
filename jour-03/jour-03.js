export function coordonneesDuParcours(parcours) {
  const depart = { x: 0, y: 0 };

  const toutesLesInstructions = parcours.split(",");

  const coordonnees = toutesLesInstructions.reduce(
    (resultat, instruction) => {
      const derniereCoordonnee = resultat[resultat.length - 1];
      return [...resultat, ...deplacement(instruction, derniereCoordonnee)];
    },
    [depart]
  );

  return coordonnees;
}

function deplacement(instruction, pointDeDepart) {
  const deplacementVers = {
    R: index => ({ ...pointDeDepart, x: pointDeDepart.x + index + 1 }),
    L: index => ({ ...pointDeDepart, x: pointDeDepart.x - index - 1 }),
    U: index => ({ ...pointDeDepart, y: pointDeDepart.y + index + 1 }),
    D: index => ({ ...pointDeDepart, y: pointDeDepart.y - index - 1 })
  };

  const [direction, nombre] = instruction;
  return range(nombre).map(deplacementVers[direction]);
}

function range(nombre) {
  return new Array(Number(nombre)).fill(null).map((_, index) => index);
}

export function intersections(parcoursA, parcoursB) {
  return parcoursA.filter(({ x: xA, y: yA }) =>
      parcoursB.find(({ x: xB, y: yB }) => xA === xB && yA === yB)
  );
}