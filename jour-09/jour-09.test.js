import { toInts } from "../jour-05/jour-05.test";
import { ordinateur } from "../jour-05/jour-05";
import { inputJ9 } from "./input";
import { inputValues } from "../jour-05/operations";

describe("Jour 09 - part 01", () => {
  it("programme qui produit une copie de lui-même", () => {
    const code = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
    const programme = toInts(code);
    const outputs = [];
    const recordOutput = o => outputs.push(o);

    ordinateur(programme).executer({ outputFn: recordOutput });

    expect(outputs.join(",")).toEqual(code);
  });

  it("sort un 16-digits", () => {
    const programme = toInts("1102,34915192,34915192,7,4,7,99,0");
    const outputs = [];
    const recordOutput = o => outputs.push(o);

    ordinateur(programme).executer({ outputFn: recordOutput });

    const longueurDeOutput = String(outputs.pop()).length;
    expect(longueurDeOutput).toBe(16);
  });

  it("output le nombre du milieu", () => {
    const programme = toInts("104,1125899906842624,99");

    const outputs = [];
    const recordOutput = o => outputs.push(o);

    ordinateur(programme).executer({ outputFn: recordOutput });

    expect(outputs.pop()).toBe(1125899906842624);
  });

  it("trouve la solution", () => {
    const programme = toInts(inputJ9);
    const inputs = inputValues([1]);
    const outputs = [];
    const recordOutput = o => outputs.push(o);

    ordinateur(programme).executer({ inputs, outputFn: recordOutput });

    expect(outputs.pop()).toBe(3546494377);
  });
});

describe("Jour 09 - part 02", () => {
  it("trouve la solution", () => {
    const programme = toInts(inputJ9);
    const inputs = inputValues([2]);
    const outputs = [];
    const recordOutput = o => outputs.push(o);

    ordinateur(programme).executer({ inputs, outputFn: recordOutput });

    expect(outputs.pop()).toBe(47253);
  });
});
