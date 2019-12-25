import { toMemory } from "../jour-05/jour-05.test";
import { inputJ11 } from "./input";
import { executer } from "../jour-05/jour-05";
import { BLANC, NOIR, Terrain } from "./jour-11";

describe("Jour 11", () => {
  it("manipute la grille", () => {
    const grille = Terrain();
    grille.peindre({ x: 0, y: 0 }, BLANC);

    expect(grille.get({ x: 0, y: 0 })).toBe(BLANC);
    expect(grille.peinture()).toBe(1);
  });

  it("trouve la solution", () => {
    const Robot = terrain => {
      return {
        position: { x: 0, y: 0, orientation: 0 },
        camera() {
          const codes = { [BLANC]: 1, [NOIR]: 0 };
          const couleurSurvolee = codes[terrain.get(this.position)];
          return { couleurSurvolee };
        }
      };
    };

    const ship = new Terrain();
    const nono = new Robot(ship);

    const positionDuRobot = nono.position;
    const inputCamera = {
      nextValue: () => nono.camera().couleurSurvolee
    };

    let rotationOuCouleur = 0;

    const robot = o => {
      const pinceaux = { [1]: BLANC, [0]: NOIR };
      const peindre = rotationOuCouleur === 0;
      if (peindre) {
        ship.peindre(positionDuRobot, pinceaux[o]);
        rotationOuCouleur = 1;
      } else {
        positionDuRobot.orientation =
          (positionDuRobot.orientation + (o === 0 ? 270 : 90)) % 360;

        switch (positionDuRobot.orientation) {
          case 0:
            positionDuRobot.y += 1;
            break;
          case 90:
            positionDuRobot.x += 1;
            break;
          case 180:
            positionDuRobot.y -= 1;
            break;
          case 270:
            positionDuRobot.x -= 1;
            break;
        }
        rotationOuCouleur = 0;
      }
    };

    const programme = toMemory(inputJ11);
    executer(programme, { inputs: inputCamera, outputFn: robot });

    expect(ship.peinture()).toBe(1747);

    ship.afficher();
  });
});
