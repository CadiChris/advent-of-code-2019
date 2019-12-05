const OP_CODES = {
  ADD: 1,
  MULTIPLY: 2,
  HALT: 99
};

const PositionParameter = adresse => ({
  value: programme => programme[adresse]
});

export function getInstruction(programme, adresse) {
  if (programme[adresse] === OP_CODES.HALT) return { opcode: OP_CODES.HALT };

  const [opcode, i1, i2, output] = programme.slice(adresse, adresse + 4);

  return {
    opcode,
    parameters: [PositionParameter(i1), PositionParameter(i2)],
    output,
    prochaine: adresse + 4
  };
}

export function appliquer(instruction, programme) {
  const { opcode, parameters, output } = instruction;

  const operationParOpcode = {
    [OP_CODES.ADD]: () =>
      parameters[0].value(programme) + parameters[1].value(programme),
    [OP_CODES.MULTIPLY]: () =>
      parameters[0].value(programme) * parameters[1].value(programme)
  };

  const nouveauProgramme = [...programme];
  nouveauProgramme[output] = operationParOpcode[opcode]();

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
