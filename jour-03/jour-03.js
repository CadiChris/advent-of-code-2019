export function coordonneesDuParcours(parcours) {
  const depart = { x: 0, y: 0, steps: 0 };

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

function deplacement(instruction, depart) {
  const { y, x, steps } = depart;
  const deplacementVers = {
    R: i => ({ ...depart, steps: steps + i + 1, x: x + i + 1 }),
    L: i => ({ ...depart, steps: steps + i + 1, x: x - i - 1 }),
    U: i => ({ ...depart, steps: steps + i + 1, y: y + i + 1 }),
    D: i => ({ ...depart, steps: steps + i + 1, y: y - i - 1 })
  };

  const direction = instruction.substring(0, 1);
  const nombre = instruction.substring(1);
  return range(nombre).map(deplacementVers[direction]);
}

export function range(nombre) {
  return new Array(Number(nombre)).fill(null).map((_, index) => index);
}

export function intersections(parcoursA, parcoursB) {
  const cle = ({ x, y }) => `${x},${y}`;

  const parcoursBMap = new Map();
  parcoursB.map(coord => parcoursBMap.set(cle(coord), coord));
  const estDansParcoursB = coord => parcoursBMap.has(cle(coord));

  return parcoursA
    .filter(estDansParcoursB)
    .filter(({ x, y }) => x !== 0 || y !== 0)
    .map(a => ({
      ...a,
      steps: a.steps + parcoursBMap.get(cle(a)).steps
    }));
}

export function manhattanMini(points) {
  const manhattan = ({ x, y }) => Math.abs(x) + Math.abs(y);
  return Math.min(...points.map(manhattan));
}

export function stepsMini(coordonnees) {
  return Math.min(...coordonnees.map(c => c.steps));
}
