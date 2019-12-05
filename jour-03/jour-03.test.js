import {
  coordonneesDuParcours,
  intersections,
  manhattanMini,
  stepsMini
} from "./jour-03";
import { inputA, inputB } from "./input";

describe("coordonnées d'un parcours", () => {
  it("va dans une directions", () => {
    expect(coordonneesDuParcours("R1")).toEqual([
      { x: 0, y: 0, steps: 0 },
      { x: 1, y: 0, steps: 1 }
    ]);

    expect(coordonneesDuParcours("R3")).toEqual([
      { x: 0, y: 0, steps: 0 },
      { x: 1, y: 0, steps: 1 },
      { x: 2, y: 0, steps: 2 },
      { x: 3, y: 0, steps: 3 }
    ]);
  });

  it("enchaîne deux directions", () => {
    expect(coordonneesDuParcours("R2,R1")).toEqual([
      { x: 0, y: 0, steps: 0 },
      { x: 1, y: 0, steps: 1 },
      { x: 2, y: 0, steps: 2 },
      { x: 3, y: 0, steps: 3 }
    ]);
  });

  it("connaît toutes les directions", () => {
    expect(coordonneesDuParcours("R1,U1,L1,D1")).toEqual([
      { x: 0, y: 0, steps: 0 },
      { x: 1, y: 0, steps: 1 },
      { x: 1, y: 1, steps: 2 },
      { x: 0, y: 1, steps: 3 },
      { x: 0, y: 0, steps: 4 }
    ]);
  });
});

describe("intersections de deux parcours", () => {
  it("trouve une intersection et somme ses steps", () => {
    const parcoursA = [{ x: 1, y: 1, steps: 3 }];
    const parcoursB = [
      { x: 1, y: 1, steps: 4 },
      { x: 2, y: 1 }
    ];

    expect(intersections(parcoursA, parcoursB)).toEqual([
      { x: 1, y: 1, steps: 7 }
    ]);
  });
});

describe("distances de manhattan", () => {
  it("trouve la coordonnée ayant la plus petite distance de Manhattan", () => {
    expect(
      manhattanMini([
        { x: 3, y: 3 },
        { x: 6, y: 5 }
      ])
    ).toBe(6);
  });
});

describe("steps mini", () => {
  it("trouve la coordonnées avec le plus petit steps", () => {
    expect(stepsMini([{ steps: 5 }, { steps: 1 }])).toEqual(1);
  });
});

describe("jour 03", () => {
  it("Example 1", () => {
    const parcoursA = "R8,U5,L5,D3";
    const parcoursB = "U7,R6,D4,L4";

    expect(
      manhattanMini(
        intersections(
          coordonneesDuParcours(parcoursA),
          coordonneesDuParcours(parcoursB)
        )
      )
    ).toBe(6);
  });

  it("exemple 2", () => {
    const parcoursA = "U62,R66,U55,R34,D71,R55,D58,R83";
    const parcoursB = "R75,D30,R83,U83,L12,D49,R71,U7,L72";

    const X = intersections(
      coordonneesDuParcours(parcoursA),
      coordonneesDuParcours(parcoursB)
    );

    expect(manhattanMini(X)).toBe(159);
    expect(stepsMini(X)).toBe(610);
  });

  it("trouve la solution", () => {
    const X = intersections(
      coordonneesDuParcours(inputA),
      coordonneesDuParcours(inputB)
    );

    expect(manhattanMini(X)).toBe(266);
    expect(stepsMini(X)).toBe(19242);
  });
});
