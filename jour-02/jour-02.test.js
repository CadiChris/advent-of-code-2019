import { appliquer, decode, executer } from "./jour-02";
import { input } from "./input";

describe("Jour 2", () => {
  const programme = "1,9,10,3,2,3,11,0,99,30,40,50".split(",").map(Number);
  it("décode 4 instructions et le reste du programme", () => {
    expect(decode(programme)).toEqual({
      programme: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
      instruction: { opcode: 1, inputs: [9, 10], output: 3 },
      index: 1
    });
  });

  it("applique une instruction au programme", () => {
    const todo = decode(programme);

    const resultat = appliquer(todo);

    expect(resultat).toEqual({
      index: 1,
      instruction: { opcode: 1, inputs: [9, 10], output: 3 },
      programme: [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
    });
  });

  it("fait avancer l'index du programme", () => {
    const todo = decode(programme, 2);
    expect(todo).toEqual({
      programme: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
      index: 2,
      instruction: { opcode: 2, inputs: [3, 11], output: 0 }
    });
    expect(decode(programme, 3).instruction.opcode).toEqual(99);
  });

  it("exécute un programme jusqu'à l'arrêt", () => {
    const resultat = executer(programme);
    expect(resultat.index).toBe(3);
  });

  it("trouve la solution - part 1", () => {
    const programmeAvantIncident = input.split(",").map(Number);
    programmeAvantIncident[1] = 12;
    programmeAvantIncident[2] = 2;

    const resultat = executer(programmeAvantIncident);
    expect(resultat.programme[0]).toBe(3409710);
  });

  function testerInputs(nom, verbe) {
    const programmeAvantIncident = input.split(",").map(Number);
    programmeAvantIncident[1] = nom;
    programmeAvantIncident[2] = verbe;
    return executer(programmeAvantIncident);
  }

  it("trouve la solution - part 2", () => {
    for (let nom = 0; nom <= 99; nom++)
      for (let verbe = 0; verbe <= 99; verbe++) {
        const resultat = testerInputs(nom, verbe);
        if (resultat.programme[0] === 19690720)
          throw Error(`La solution est ${100 * nom + verbe}`); // 7912
      }
  });
});
