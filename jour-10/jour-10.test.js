import { asteroide } from "./jour-10";

describe("Jour 10 - part 01", () => {
  it("sait dire si A voit B", () => {
    const map = [".#..#", ".....", "#####", "....#", "...##"];

    expect(asteroide(3, 4).voit(asteroide(4, 0), map)).toBe(true);
    expect(asteroide(3, 4).voit(asteroide(1, 0), map)).toBe(false);
    expect(asteroide(4, 4).voit(asteroide(4, 0), map)).toBe(false);
  });
});
