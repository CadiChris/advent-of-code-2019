import { enArbre, toutesLesDistances } from "./jour-06";
import { inputJ6 } from "./input";

describe("Jour 06 - part 01", () => {
  it("fait l'exemple", () => {
    const orbites = [
      "COM)B",
      "B)C",
      "C)D",
      "D)E",
      "E)F",
      "B)G",
      "G)H",
      "D)I",
      "E)J",
      "J)K",
      "K)L"
    ];

    expect(toutesLesDistances(orbites)).toBe(42);
  });

  it("crée un arbre et son child", () => {
    const orbites = ["COM)B", "COM)C"];
    const com = enArbre(orbites);
    expect(com.children.length).toEqual(2);
    const b = com.children[0];
    expect(b.children.length).toEqual(0);
  });

  it("trouve la solution", () => {
    expect(toutesLesDistances(inputJ6)).toBe(0);
  });
});
