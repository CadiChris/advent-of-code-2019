import { toInts } from "../jour-05/jour-05.test";
import { inputJ13 } from "./input";
import { executer } from "../jour-05/jour-05";
import { compteLesBlocks } from "./jour-13";

describe("Jour 13 - part 01", () => {
  it("compte les block tiles", () => {
    const programme = toInts(inputJ13);

    const outputs = [];
    const recordOutput = o => outputs.push(o);

    executer(programme, { outputFn: recordOutput });

    expect(compteLesBlocks(outputs)).toBe(412);
  });
});
