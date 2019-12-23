import {
  distancePrefixe,
  enMap,
  getCom,
  parentsDe,
  toutesLesDistances
} from "./jour-06";
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
    const com = getCom(orbites);
    expect(com.children.length).toEqual(2);
    const b = com.children[0];
    expect(b.children.length).toEqual(0);
  });

  it("trouve la solution", () => {
    expect(toutesLesDistances(inputJ6)).toBe(142915);
  });
});

describe("Jour 06 - part 02", () => {
  it("permet d'accéder directement à un noeud", () => {
    const orbites = ["COM)B", "COM)C"];
    const laMap = enMap(orbites);
    expect(laMap.get("C").children.length).toBe(0);
  });

  it("stocke le parent", () => {
    const orbites = ["COM)B", "COM)C"];
    const laMap = enMap(orbites);
    expect(laMap.get("C").parent).toBe(laMap.get("COM"));
  });

  it("donne tous ses parents", () => {
    const orbites = ["COM)B", "COM)C"];
    const laMap = enMap(orbites);
    const lesParentsDeB = parentsDe(laMap.get("B"));
    expect(lesParentsDeB).toEqual([laMap.get("COM")]);
  });

  it("trouve la distance préfixe", () => {
    const distance = distancePrefixe(["A", "B"], ["B"]);
    expect(distance).toBe(1);
  });

  it("trouve la solution", () => {
    const laMap = enMap(inputJ6);
    const entreYouEtSan = distancePrefixe(
      parentsDe(laMap.get("YOU")),
      parentsDe(laMap.get("SAN"))
    );
    expect(entreYouEtSan).toBe(283);
  });
});
