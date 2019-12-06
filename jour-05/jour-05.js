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

  const [opcode, p1, p2, p3] = programme.slice(adresse, adresse + 4);

  return {
    opcode,
    parameters: [
      PositionParameter(p1),
      PositionParameter(p2),
      ImmediateParameter(p3)
    ],
    prochaine: adresse + 4
  };
}

export function appliquer(instruction, programme) {
  const {
    opcode,
    parameters: [p1, p2, p3]
  } = instruction;

  const appliquerOpcode = {
    [OP_CODES.ADD]: () => {
      const next = [...programme];
      next[p3.value(programme)] = p1.value(programme) + p2.value(programme);
      return next;
    },
    [OP_CODES.MULTIPLY]: () => {
      const next = [...programme];
      next[p3.value(programme)] = p1.value(programme) * p2.value(programme);
      return next;
    }
  };

  return appliquerOpcode[opcode]();
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
