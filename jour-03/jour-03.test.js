import { coordonneesDuParcours, intersections } from "./jour-03";

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

describe("intersections de deux parcours", () => {
  it("trouve une intersection", () => {
    const parcoursA = [{ x: 1, y: 1 }];
    const parcoursB = [
      { x: 1, y: 1 },
      { x: 2, y: 1 }
    ];

    expect(intersections(parcoursA, parcoursB)).toEqual([{ x: 1, y: 1 }]);
  });
});
