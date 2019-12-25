import { toMemory } from "../jour-05/jour-05.test";
import { inputJ11 } from "./input";
import { executer } from "../jour-05/jour-05";
import { BLANC, NOIR, Robot, Terrain } from "./jour-11";

describe("Jour 11", () => {
  it("manipute le terrain", () => {
    const grille = Terrain();
    grille.peindre({ x: 0, y: 0 }, BLANC);

    expect(grille.get({ x: 0, y: 0 })).toBe(BLANC);
    expect(grille.peinture()).toBe(1);
  });

  it("trouve la solution", () => {
    const ship = new Terrain();
    const nono = new Robot(ship);

    const inputCamera = {
      nextValue: () => nono.camera().couleurSurvolee
    };

    let rotationOuCouleur = 0;
    const commanderRobot = outputDuProgramme => {
      const peindre = rotationOuCouleur === 0;
      if (peindre) {
        const pinceaux = { [1]: BLANC, [0]: NOIR };
        const couleur = pinceaux[outputDuProgramme];
        nono.peindre(couleur);
        rotationOuCouleur = 1;
      } else {
        const angle = outputDuProgramme === 0 ? 270 : 90;
        nono.deplacer(angle);
        rotationOuCouleur = 0;
      }
    };

    const programme = toMemory(inputJ11);
    executer(programme, { inputs: inputCamera, outputFn: commanderRobot });

    expect(ship.peinture()).toBe(1747);

    ship.afficher();
  });
});
