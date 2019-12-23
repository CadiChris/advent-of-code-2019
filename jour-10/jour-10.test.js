import { asteroide } from "./jour-10";

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
});
