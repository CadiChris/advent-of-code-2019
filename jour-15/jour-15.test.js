import { toInts } from "../jour-05/jour-05.test";
import { inputJ15_H4CK_traverse_les_murs } from "./inputJ15";
import { inputValues } from "../jour-05/operations";
import { executer } from "../jour-05/jour-05";

describe("Jour 15", () => {
  it("trouve en passant à traver les murs", () => {
    const programme = toInts(inputJ15_H4CK_traverse_les_murs);

    const allerRetour = [...Array(39).fill(4), ...Array(39).fill(3), 2];
    expect(allerRetour.length).toBe(39 + 39 + 1);

    const touteLaGrille = Array(39)
      .fill(null)
      .map(x => allerRetour)
      .flat();
    expect(touteLaGrille.length).toBe(allerRetour.length * 39);

    const directionOrigine = [...Array(20).fill(3), ...Array(20).fill(1)];

    const inputs = inputValues([...directionOrigine, ...touteLaGrille]);

    const outputs = [];
    const recordOutput = o => outputs.push(o);
    executer(programme, { inputs, outputFn: recordOutput });

    const labyrintheResolu =
      "...█...█        .....█.....█    ...█   █" +
      ".█.█.█.█████████.███.█.███.█████.█.███ █" +
      ".█...█.........█.█  ...█ █.......█.....█" +
      ".█████████████.█.███████ █████████████.█" +
      "...........█  ...█...█...  █.......█...█" +
      " █████████.███ ███.█.█.█.███.█████.█.███" +
      " █       █...█ █...█.█.█.....█...█...█ █" +
      " █ █████ ███.███.███.█.███████.█.█████ █" +
      "   █   █ █ █.....  █.█.........█.█2....█" +
      "██████ █ █ █████████.███████████.█████.█" +
      "       █ █     █.....█         █.█...█.█" +
      " █ ███ █ █ ███ █.█████ █████ █ █.█.█.█.█" +
      " █   █ █   █   █.█   █     █ █ █...█.█.█" +
      " ███ █ ███ █████.█ █ █████ █ █ █████.█.█" +
      "   █ █   █ █.....█ █   █   █ █     █.█.█" +
      "██ █ ███ █ █.█████ █████ ███ █ █████.█.█" +
      " █ █ █   █ █.....█       █ █ █ █.....█.█" +
      " █ █ █████ █████.███████ █ █ ███.█████.█" +
      " █ █     █ █   █...█...█   █   █.█.....█" +
      " █ █████ █ █ █████.█.█.█ █████ █.█.███ █" +
      "   █   █   █     █.█D█.█ █...█...█...█ █" +
      " ███ █ █████ █ █ █.███.███.█.█.█████.█ █" +
      " █   █   █   █ █ █.  █.....█.█...█...█ █" +
      " █████ █ █████ ███.█ ███████.███.█.███ █" +
      " █     █     █ █...█ █.....█...█...█   █" +
      " █ █████████ █ █.█████.███.███.███ █████" +
      "   █       █ █ █.....█.█...  █.█   █...█" +
      "████ █ █████ █ █████.█.█.███ █.█████.█.█" +
      " █   █     █       █...█...█ █.......█.█" +
      " █ ███████ ███████ ███████.███████████.█" +
      " █     █ █       █ █     █...█.........█" +
      " █████ █ ███████ █ █████ ███.█.█████████" +
      " █   █     █   █ █ █   █   █...█       █" +
      " █ █ █████ █ █ █ █ █ █ ███ █████████ █ █" +
      "   █     █   █ █ █ █ █           █   █ █" +
      " ███ █████████ █ █ █ ███████████ █ ███ █" +
      "   █         █ █   █ █     █     █ █ █ █" +
      "██ █████ █████ █████ █ ███ █ █████ █ █ █" +
      "       █             █   █         █   █";

    const cheminLePlusCourt = 318;
    expect(labyrintheResolu.match(/\.|2/g).length).toBe(cheminLePlusCourt);
  });
});
