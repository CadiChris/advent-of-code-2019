import {
  ADRESSE_DEPART,
  appliquer,
  executer,
  getInstruction,
  getModesDesParametres,
  getOpcode,
  getParametres,
  ImmediateParameter,
  OP_CODES,
  PositionParameter
} from "./jour-05";

describe("Jour 5", () => {
  const programme = toMemory("1,9,10,3,2,3,11,0,99,30,40,50");

  it("décode une instruction", () => {
    expect(getInstruction(programme, ADRESSE_DEPART)).toMatchObject({
      opcode: OP_CODES.ADD,
      nextAdresse: ADRESSE_DEPART + 4
    });
  });

  it("décode le opcode d'une instruction", () => {
    expect(getOpcode(1101)).toBe(OP_CODES.ADD);
    expect(getOpcode(1)).toBe(OP_CODES.ADD);
    expect(getOpcode(99)).toBe(OP_CODES.HALT);
  });

  describe("paramètres d'instruction", () => {
    it("donne les modes des paramètres", () => {
      const valeur = 1002;
      expect(getModesDesParametres(valeur)).toEqual([
        PositionParameter,
        ImmediateParameter,
        ImmediateParameter
      ]);
    });

    it("crée les paramètres d'une instruction", () => {
      const programme = [1002, 4, 3, 4, 33];
      const parametres = getParametres(programme, ADRESSE_DEPART);
      expect(parametres[0]).toBe(33);
      expect(parametres[1]).toBe(3);
      expect(parametres[2]).toBe(4);
    });
  });

  it("applique une instruction au programme", () => {
    const instruction = getInstruction(programme, ADRESSE_DEPART);
    const resultat = appliquer(instruction, programme);
    expect(resultat).toEqual([1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
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
});

function toMemory(programme) {
  return programme.split(",").map(Number);
}
