import { Add, ADRESSE_DEPART, executer, getOpcode, Input, OP_CODES, Output } from "./jour-05";
import { inputJ5 } from "./input";

describe("Jour 5", () => {
  it("décode le opcode d'une instruction", () => {
    expect(getOpcode(1101)).toBe(OP_CODES.ADD);
    expect(getOpcode(1)).toBe(OP_CODES.ADD);
    expect(getOpcode(99)).toBe(OP_CODES.HALT);
  });

  describe("paramètres d'instruction", () => {
    it("crée les paramètres d'une opération ADD", () => {
      const programme = [1002, 4, 3, 4, 33];
      const parametres = Add(ADRESSE_DEPART).getParametres(programme);
      expect(programme[parametres[0]]).toBe(33);
      expect(programme[parametres[1]]).toBe(3);
      expect(programme[parametres[2]]).toBe(33);
    });

    it("crée le paramètre d'un instruction INPUT", () => {
      const programme = toMemory("3,50");
      const parametre = Input(ADRESSE_DEPART).getParametre(programme);
      expect(parametre).toBe(50);
    });

    it("crée le paramètre d'une instruction OUTPUT", () => {
      const programme = toMemory("4,50");
      const parametre = Output(ADRESSE_DEPART).getParametre(programme);
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

  it("trouve la solution", () => {
    const programme = toMemory(inputJ5);
    executer(programme); // 13547311
  });
});

function toMemory(programme) {
  return programme.split(",").map(Number);
}
