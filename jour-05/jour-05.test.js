import {
  Add,
  ADRESSE_DEPART,
  executer,
  getOpcode,
  getTroisParametres,
  getUnParametre,
  Input,
  inputValues,
  OP_CODES,
  Output
} from "./jour-05";
import { inputJ5 } from "./input";

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

    it("crée le paramètre d'un instruction à un paramètre", () => {
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
  it("joue l'exemple 1 avec EQUAL TO", () => {
    const programme = toMemory("3,9,8,9,10,9,4,9,99,-1,8");
    const input8 = inputValues([8]);
    const outputs = [];
    const recordOutputs = o => outputs.push(o);

    executer(programme, { inputs: input8, outputFn: recordOutputs });

    expect(outputs.pop()).toBe(1);
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

function toMemory(programme) {
  return programme.split(",").map(Number);
}
