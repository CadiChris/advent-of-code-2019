import {
  appliquerGravitation,
  appliquerVelocite,
  creeLune,
  energie,
  Lune,
  Position,
  systeme,
  Velocite
} from "./jour-12";

describe("Jour 12 - part 01", () => {
  it("positionne une lune", () => {
    const origine = Position(0, 0, 0);
    const arret = Velocite(0, 0, 0);

    const europa = Lune(origine, arret);

    expect(europa.position.x).toBe(0);
    expect(europa.velocite.x).toBe(0);
    expect(europa.details()).toBe("pos=<x=0, y=0, z=0>, vel=<x=0, y=0, z=0>");
  });

  describe("applique la gravitation", () => {
    let lune3, lune5;
    beforeEach(() => {
      lune3 = Lune(Position(3, 3, 3), Velocite(0, 0, 0));
      lune5 = Lune(Position(5, 5, 5), Velocite(0, 0, 0));
    });

    it("gravitation faible > fort", () => {
      appliquerGravitation(lune3, lune5);

      expect(lune3.velocite.x).toBe(1);
      expect(lune3.velocite.y).toBe(1);
      expect(lune3.velocite.z).toBe(1);

      expect(lune5.velocite.x).toBe(-1);
      expect(lune5.velocite.y).toBe(-1);
      expect(lune5.velocite.z).toBe(-1);
    });

    it("gravitation fort > faible", () => {
      appliquerGravitation(lune5, lune3);
      expect(lune3.velocite.x).toBe(1);
      expect(lune5.velocite.z).toBe(-1);
    });
  });

  it("applique la vélocité", () => {
    const origine = Position(0, 0, 0);
    const l = Lune(origine, Velocite(1, 2, 3));
    appliquerVelocite(l);
    expect(l.position.x).toBe(1);
    expect(l.position.y).toBe(2);
    expect(l.position.z).toBe(3);
  });

  it("crée une lune d'après les coordonnes", () => {
    const coords = "<x=-1, y=0, z=2>";
    const lune = creeLune(coords);
    expect(lune.details()).toBe("pos=<x=-1, y=0, z=2>, vel=<x=0, y=0, z=0>");
  });

  it("fait tourner un systeme", () => {
    const coords = [
      "<x=-1, y=0, z=2>",
      "<x=2, y=-10, z=-7>",
      "<x=4, y=-8, z=8>",
      "<x=3, y=5, z=-1>"
    ];

    const unTour = 1;
    const lunes = systeme(coords, unTour);

    expect(lunes[0].details()).toBe(
      "pos=<x=2, y=-1, z=1>, vel=<x=3, y=-1, z=-1>"
    );
  });

  it("fait tourner un systeme plein de fois", () => {
    const coords = [
      "<x=-1, y=0, z=2>",
      "<x=2, y=-10, z=-7>",
      "<x=4, y=-8, z=8>",
      "<x=3, y=5, z=-1>"
    ];

    const lunes = systeme(coords, 10);

    expect(lunes[0].details()).toBe(
      "pos=<x=2, y=1, z=-3>, vel=<x=-3, y=-2, z=1>"
    );
  });

  it("calcule l'énergie du système", () => {
    const coords = [
      "<x=-1, y=0, z=2>",
      "<x=2, y=-10, z=-7>",
      "<x=4, y=-8, z=8>",
      "<x=3, y=5, z=-1>"
    ];

    const lunes = systeme(coords, 10);
    expect(energie(lunes)).toBe(179);
  });

  it("trouve la solution", () => {
    const coords = [
      "<x=4, y=12, z=13>",
      "<x=-9, y=14, z=-3>",
      "<x=-7, y=-1, z=2>",
      "<x=-11, y=17, z=-1>"
    ];

    expect(energie(systeme(coords, 1000))).toBe(5350);
  });
});
