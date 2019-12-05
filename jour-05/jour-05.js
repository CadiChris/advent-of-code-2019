const OP_CODES = {
  ADD: 1,
  MULTIPLY: 2,
  HALT: 99
};

const PositionParameter = adresse => ({
  value: programme => programme[adresse]
});
const ImmediateParameter = adresse => ({
  value: () => adresse
});

export function getInstruction(programme, adresse) {
  if (programme[adresse] === OP_CODES.HALT) return { opcode: OP_CODES.HALT };

  const [opcode, i1, i2, output] = programme.slice(adresse, adresse + 4);

  return {
    opcode,
    parameters: [PositionParameter(i1), PositionParameter(i2)],
    output: ImmediateParameter(output),
    prochaine: adresse + 4
  };
}

export function appliquer(instruction, programme) {
  const {
    opcode,
    parameters: [p1, p2],
    output
  } = instruction;

  const operationParOpcode = {
    [OP_CODES.ADD]: () => p1.value(programme) + p2.value(programme),
    [OP_CODES.MULTIPLY]: () => p1.value(programme) * p2.value(programme)
  };

  const nouveauProgramme = [...programme];
  nouveauProgramme[output.value(programme)] = operationParOpcode[opcode]();

  return nouveauProgramme;
}

export const depart = 0;
export function executer(programme) {
  let instruction = getInstruction(programme, depart);
  while (instruction.opcode !== OP_CODES.HALT) {
    programme = appliquer(instruction, programme);
    instruction = getInstruction(programme, instruction.prochaine);
  }
  return programme;
}
