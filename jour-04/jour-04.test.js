import { criteres, range } from "./jour-04";

describe("création de range", () => {
  it("crée un range entre 2 nombres", () => {
    expect(range(13, 16)).toEqual([13, 14, 15, 16]);
  });
});

describe("critères de mot de passe", () => {
  it("valide si 2 chiffres adjacents sont les mêmes", () => {
    expect(criteres.chiffresAdacents(112345)).toBe(true);
    expect(criteres.chiffresAdacents(192345)).toBe(false);
    expect(criteres.chiffresAdacents(123789)).toBe(false);
  });

  it("valide si tous les chiffres croissent ou reste égaux", () => {
    expect(criteres.chiffresEgauxOuCroissent(12)).toBe(true);
    expect(criteres.chiffresEgauxOuCroissent(135679)).toBe(true);
    expect(criteres.chiffresEgauxOuCroissent(223450)).toBe(false);

    expect(criteres.chiffresEgauxOuCroissent(55355)).toBe(false);
  });
});

describe("jour 04", () => {
  it("trouve la solution", () => {
    const estValide = mot =>
      criteres.chiffresAdacents(mot) && criteres.chiffresEgauxOuCroissent(mot);

    const valides = range(382345, 843167).filter(estValide);

    expect(valides.length).toBe(460);
  });
});
