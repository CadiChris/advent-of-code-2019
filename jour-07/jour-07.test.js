import { inputJ7 } from "./input";
import { executer, inputValues } from "../jour-05/jour-05";
import { toMemory } from "../jour-05/jour-05.test";
import { amplifier } from "./jour-07";

describe("Jour 07", () => {
  const programme = toMemory(inputJ7);
  it("découvre le mécanisme des amplifieurs", () => {
    const inputA = inputValues([3, 0]);
    const outputA = [];
    const recordA = o => outputA.push(o);

    executer(programme, { inputs: inputA, outputFn: recordA });

    const inputB = inputValues([1, outputA.pop()]);
    const outputB = [];
    const recordB = o => outputB.push(o);
    executer(programme, { inputs: inputB, outputFn: recordB });

    expect(outputB.pop()).toEqual(281);
  });

  it("chaîne deux amplifieurs", () => {
    const signal = amplifier([3, 1], programme);
    expect(signal).toBe(281);
  });
});
