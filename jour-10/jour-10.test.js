import { asteroide, stationOrbitale } from "./jour-10";
import { inputJ10 } from "./input";

describe("Jour 10 - part 01", () => {
  const map = [".#..#", ".....", "#####", "....#", "...##"];

  it("sait dire si A voit B", () => {
    expect(asteroide(3, 4).voit(asteroide(4, 0), map)).toBe(true);
    expect(asteroide(3, 4).voit(asteroide(1, 0), map)).toBe(false);
    expect(asteroide(4, 4).voit(asteroide(4, 0), map)).toBe(false);
  });

  it("trouve le nombre d'asteroides visibles par un asteroide", () => {
    expect(asteroide(3, 4).detecteDans(map)).toBe(8);
    expect(asteroide(4, 2).detecteDans(map)).toBe(5);
  });

  it("trouve où placer la station orbitale", () => {
    expect(stationOrbitale(map)).toEqual({ x: 3, y: 4, detections: 8 });
  });

  it("fait l'exemple plus grand", () => {
    const map = [
      "......#.#.",
      "#..#.#....",
      "..#######.",
      ".#.#.###..",
      ".#..#.....",
      "..#....#.#",
      "#..#....#.",
      ".##.#..###",
      "##...#..#.",
      ".#....####"
    ];

    expect(stationOrbitale(map)).toEqual({ x: 5, y: 8, detections: 33 });
  });

  it("fait l'exemple plus grand 2", () => {
    const map = [
      ".#..##.###...#######",
      "##.############..##.",
      ".#.######.########.#",
      ".###.#######.####.#.",
      "#####.##.#.##.###.##",
      "..#####..#.#########",
      "####################",
      "#.####....###.#.#.##",
      "##.#################",
      "#####.##.###..####..",
      "..######..##.#######",
      "####.##.####...##..#",
      ".#####..#.######.###",
      "##...#.##########...",
      "#.##########.#######",
      ".####.#.###.###.#.##",
      "....##.##.###..#####",
      ".#.#.###########.###",
      "#.#.#.#####.####.###",
      "###.##.####.##.#..##"
    ];

    expect(stationOrbitale(map)).toEqual({ x: 11, y: 13, detections: 210 });
  });

  it("trouve la solution", () => {
    expect(stationOrbitale(inputJ10)).toEqual({
      detections: 274,
      x: 19,
      y: 14
    });
  });
});
