import { toMemory } from "../jour-05/jour-05.test";
import { inputJ11 } from "./input";
import { executer } from "../jour-05/jour-05";
import { BLANC, ControleDeRobot, Robot, Terrain } from "./jour-11";

describe("Jour 11", () => {
  it("manipute le terrain", () => {
    const terrain = Terrain();
    terrain.peindre({ x: 0, y: 0 }, BLANC);

    expect(terrain.get({ x: 0, y: 0 })).toBe(BLANC);
    expect(terrain.peinture()).toBe(1);
  });

  it("trouve la solution", () => {
    const programme = toMemory(inputJ11);

    const ship = new Terrain();
    const nono = new Robot(ship);

    const inputCamera = {
      nextValue: () => nono.camera().couleurSurvolee
    };

    executer(programme, {
      inputs: inputCamera,
      outputFn: ControleDeRobot(nono).controler
    });

    expect(ship.peinture()).toBe(1747);

    ship.afficher();
  });
});
