import { ADRESSE_DEPART, executer } from "./jour-05";
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
      const programme = [1002, 4, 3, 4, 33];
      const parametres = getTroisParametres(programme, ADRESSE_DEPART);
      expect(programme[parametres[0]]).toBe(33);
      expect(programme[parametres[1]]).toBe(3);
      expect(programme[parametres[2]]).toBe(33);
    });

    it("crée les paramètres d'une opération à 2 paramètres", () => {
      const programme = toMemory("1002,4,3,4,21");
      const parametres = getDeuxParametres(programme, ADRESSE_DEPART);
      expect(programme[parametres[0]]).toBe(21);
      expect(programme[parametres[1]]).toBe(3);
    });

    it("crée le paramètre d'un instruction à 1 paramètre", () => {
      const programme = toMemory("4,50");
      const parametre = getUnParametre(programme, ADRESSE_DEPART);
      expect(parametre).toBe(50);
    });
  });

  it("exécute jusqu'à la fin - 01", () => {
    expect(executer(toMemory("2,3,0,3,99"))).toEqual([2, 3, 0, 6, 99]);
  });

  it("exécute jusqu'à la fin - 02", () => {
    const resultat = executer(toMemory("1,1,1,4,99,5,6,0,99"));
    expect(resultat).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  it("exécute jusqu'à la fin", () => {
    const resultat = executer(toMemory("1101,100,-1,4,0"));
    expect(resultat).toEqual([1101, 100, -1, 4, 99]);
  });

  it("trouve la solution - part 01", () => {
    const programme = toMemory(inputJ5);
    const inputUN = inputValues([1]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    executer(programme, { inputs: inputUN, outputFn: recordOutputs });

    expect(outputs.pop()).toEqual(13547311);
  });
});

describe("Jour 05 - part 02", () => {
  it("joue l'exemple EQUAL TO en POSITION MODE", () => {
    const programme = toMemory("3,9,8,9,10,9,4,9,99,-1,8");
    const input8 = inputValues([8]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    executer(programme, { inputs: input8, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(1);
  });

  it("joue l'exemple LESS THAN en POSITION MODE", () => {
    const programme = toMemory("3,9,7,9,10,9,4,9,99,-1,8");
    const input7 = inputValues([7]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    executer(programme, { inputs: input7, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(1);
  });

  it("joue l'exemple JUMP en POSITION MODE", () => {
    const programme = toMemory("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9");
    const input0 = inputValues([0]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    executer(programme, { inputs: input0, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(0);
  });

  it("joue l'exemple JUMP en IMMEDIATE MODE", () => {
    const programme = toMemory("3,3,1105,-1,9,1101,0,0,12,4,12,99,1");
    const input0 = inputValues([0]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    executer(programme, { inputs: input0, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(0);
  });

  it("joue le LARGER EXAMPLE", () => {
    const programme = toMemory(
      `3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`
    );
    const inputPlusQue8 = inputValues([9]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    executer(programme, { inputs: inputPlusQue8, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(1001);
  });

  it("trouve la solution - part 02", () => {
    const programme = toMemory(inputJ5);
    const input5 = inputValues([5]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    executer(programme, { inputs: input5, outputFn: recordOutputs });

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

export function toMemory(programme) {
  return programme.split(",").map(Number);
}
