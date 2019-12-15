import {
  calques,
  compte,
  couleur,
  COULEURS,
  decode,
  decompose,
  lignes,
  moinsDe0
} from "./jour-08";
import { inputJ8 } from "./input";

describe("Jour 08 - part 01", () => {
  const troisXdeux = { largeur: 3, hauteur: 2 };

  it("trouve les calques d'une image", () => {
    const pixels = "123456789012000000";
    expect(calques(pixels, troisXdeux)).toEqual(["123456", "789012", "000000"]);
  });

  it("trouve les lignes d'un calque", () => {
    const pixels = "123456";
    expect(lignes(pixels, troisXdeux)).toEqual(["123", "456"]);

    const morePixels = "123456789012";
    expect(lignes(morePixels, { largeur: 3, hauteur: 4 })).toEqual([
      "123",
      "456",
      "789",
      "012"
    ]);
  });

  it("trouve le calque avec le moins de 0", () => {
    const calque1 = "000111";
    const calque2 = "011111";
    expect(moinsDe0([calque1, calque2])).toBe(calque2);

    expect(compte(calque2, "1") * compte(calque1, "0")).toBe(15);
    const sans0 = "34543";
    expect(moinsDe0([calque1, sans0])).toBe(sans0);
  });

  it("trouve la réponse", () => {
    const calque0 = moinsDe0(calques(inputJ8, { largeur: 25, hauteur: 6 }));
    expect(compte(calque0, "1") * compte(calque0, "2")).toBe(1905);
  });
});

describe("Jour 08 - part 02", () => {
  const pixels = "0222112222120000";
  const deuxXdeux = { largeur: 2, hauteur: 2 };

  it("trouve la couleur d'un pixel ", () => {
    const laCouleur = couleur(
      [
        ["02", "22"],
        ["11", "22"],
        ["22", "12"],
        ["00", "00"]
      ],
      { ligne: 1, colonne: 1 }
    );

    expect(laCouleur).toBe(COULEURS.NOIR);
  });

  it("décompose une image", () => {
    expect(decompose(pixels, deuxXdeux)).toEqual([
      ["02", "22"],
      ["11", "22"],
      ["22", "12"],
      ["00", "00"]
    ]);
  });

  it("décode une image", () => {
    const image = decode(pixels, deuxXdeux);
    expect(image).toEqual(["01", "10"]);
  });
});
