import { enRam, ordinateur } from "./jour-05";
import { inputJ5 } from "./input";
import {
  getDeuxParametres,
  getTroisParametres,
  getUnParametre
} from "./parametres";
import { getOpcode, inputValues, OP_CODES } from "./operations";

describe("Jour 5 - part 01", () => {
  it("décode le opcode d'une instruction", () => {
    expect(getOpcode(1101)).toBe(OP_CODES.ADD);
    expect(getOpcode(1)).toBe(OP_CODES.ADD);
    expect(getOpcode(99)).toBe(OP_CODES.HALT);
  });

  describe("paramètres d'instruction", () => {
    it("crée les paramètres d'une opération à 3 paramètre", () => {
      const programme = [1002, 4, 17, 4, 33];
      const [p1, p2, p3] = getTroisParametres(enRam(programme), 0);
      expect(p1.value()).toBe(33);
      expect(p2.value()).toBe(17);
      expect(p3.value()).toBe(33);
    });

    it("crée les paramètres d'une opération à 2 paramètres", () => {
      const programme = toInts("1002,4,28,4,21");
      const [p1, p2] = getDeuxParametres(enRam(programme), 0);
      expect(p1.value()).toBe(21);
      expect(p2.value()).toBe(28);
    });

    it("crée le paramètre d'un instruction à 1 paramètre", () => {
      const programme = toInts("4,0");
      const p1 = getUnParametre(enRam(programme), 0);
      expect(p1.value()).toBe(4);
    });
  });

  it("exécute jusqu'à la fin - 01", () => {
    expect(ordinateur(toInts("2,3,0,3,99")).executer()).toEqual([
      2,
      3,
      0,
      6,
      99
    ]);
  });

  it("exécute jusqu'à la fin - 02", () => {
    const resultat = ordinateur(toInts("1,1,1,4,99,5,6,0,99")).executer();
    expect(resultat).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  it("exécute jusqu'à la fin", () => {
    const resultat = ordinateur(toInts("1101,100,-1,4,0")).executer();
    expect(resultat).toEqual([1101, 100, -1, 4, 99]);
  });

  it("trouve la solution - part 01", () => {
    const programme = toInts(inputJ5);
    const inputUN = inputValues([1]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    ordinateur(programme).executer({
      inputs: inputUN,
      outputFn: recordOutputs
    });

    expect(outputs.pop()).toEqual(13547311);
  });
});

describe("Jour 05 - part 02", () => {
  it("joue l'exemple EQUAL TO en POSITION MODE", () => {
    const programme = toInts("3,9,8,9,10,9,4,9,99,-1,8");
    const input8 = inputValues([8]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    ordinateur(programme).executer({ inputs: input8, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(1);
  });

  it("joue l'exemple LESS THAN en POSITION MODE", () => {
    const programme = toInts("3,9,7,9,10,9,4,9,99,-1,8");
    const input7 = inputValues([7]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    ordinateur(programme).executer({ inputs: input7, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(1);
  });

  it("joue l'exemple JUMP en POSITION MODE", () => {
    const programme = toInts("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9");
    const input0 = inputValues([0]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    ordinateur(programme).executer({ inputs: input0, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(0);
  });

  it("joue l'exemple JUMP en IMMEDIATE MODE", () => {
    const programme = toInts("3,3,1105,-1,9,1101,0,0,12,4,12,99,1");
    const input0 = inputValues([0]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    ordinateur(programme).executer({ inputs: input0, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(0);
  });

  it("joue le LARGER EXAMPLE", () => {
    const programme = toInts(
      `3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`
    );
    const inputPlusQue8 = inputValues([9]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    ordinateur(programme).executer({
      inputs: inputPlusQue8,
      outputFn: recordOutputs
    });

    expect(outputs.pop()).toBe(1001);
  });

  it("trouve la solution - part 02", () => {
    const programme = toInts(inputJ5);
    const input5 = inputValues([5]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    ordinateur(programme).executer({ inputs: input5, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(236453);
  });
});

describe("inputs", () => {
  it("donne les valeurs l'une après l'autre", () => {
    const uneValeur = inputValues([1]);
    expect(uneValeur.nextValue()).toBe(1);

    const troisValeurs = inputValues([1, 2, 3]);
    expect(troisValeurs.nextValue()).toBe(1);
    expect(troisValeurs.nextValue()).toBe(2);
    expect(troisValeurs.nextValue()).toBe(3);
  });
});

export function toInts(programme) {
  return programme.split(",").map(Number);
}
