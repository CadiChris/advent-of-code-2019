import { appliquer, depart, executer, getInstruction } from "./jour-05";

describe("Jour 5", () => {
  const programme = toMemory("1,9,10,3,2,3,11,0,99,30,40,50");

  it("décode une instruction", () => {
    expect(getInstruction(programme, depart)).toEqual({
      opcode: 1,
      inputs: [9, 10],
      output: 3,
      prochaine: depart + 4
    });
  });

  it("applique une instruction au programme", () => {
    const instruction = getInstruction(programme, depart);

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
});

function toMemory(programme) {
  return programme.split(",").map(Number);
}
