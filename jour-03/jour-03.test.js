function coordonneesDuParcours(parcours) {
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

describe("coordonnées d'un parcours", () => {
  it("va dans une directions", () => {
    expect(coordonneesDuParcours("R1")).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 }
    ]);

    expect(coordonneesDuParcours("R3")).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ]);
  });

  it("enchaîne deux directions", () => {
    expect(coordonneesDuParcours("R2,R1")).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ]);
  });

  it("connaît toutes les directions", () => {
    expect(coordonneesDuParcours("R1,U1,L1,D1")).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 0 }
    ]);
  });
});
