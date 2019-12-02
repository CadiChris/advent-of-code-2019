export function decode(programme, index = 1) {
  const [opcode, i1, i2, output] = programme.slice(
    (index - 1) * 4,
    index * 4 + 4
  );

  return {
    programme,
    index,
    instruction: { opcode, inputs: [i1, i2], output }
  };
}

export function appliquer({ programme, instruction, index }) {
  const nouveauProgramme = [...programme];
  const { opcode, inputs, output } = instruction;
  const operationParOpcode = {
    1: () => programme[inputs[0]] + programme[inputs[1]],
    2: () => programme[inputs[0]] * programme[inputs[1]]
  };

  nouveauProgramme[output] = operationParOpcode[opcode]();

  return { programme: nouveauProgramme, index, instruction };
}

export function executer(programme) {
  const demarrage = decode(programme);
  let resultat = appliquer(demarrage);

  while (true) {
    const nextInstruction = decode(resultat.programme, resultat.index + 1);
    if (nextInstruction.instruction.opcode === 99) return nextInstruction;
    resultat = appliquer(nextInstruction);
  }
}
