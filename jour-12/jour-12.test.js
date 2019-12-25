import {
  appliquerGravitation,
  appliquerVelocite,
  Lune,
  Position,
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
});
