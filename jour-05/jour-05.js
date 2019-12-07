export const OP_CODES = { ADD: 1, MULTIPLY: 2, HALT: 99 };

export const PositionParameter = adresseDuParametre => ({
  value: programme => programme[programme[adresseDuParametre]]
});

export const ImmediateParameter = adresseDuParametre => ({
  value: programme => programme[adresseDuParametre]
});

export const ADRESSE_DEPART = 0;
export function executer(programme) {
  let instruction = getInstruction(programme, ADRESSE_DEPART);
  while (instruction.opcode !== OP_CODES.HALT) {
    programme = appliquer(instruction, programme);
    instruction = getInstruction(programme, instruction.nextAdresse);
  }
  return programme;
}

export function getInstruction(programme, adresse) {
  const opcode = getOpcode(programme[adresse]);
  if (opcode === OP_CODES.HALT) return { opcode: OP_CODES.HALT };

  const parametres = getParametres(programme, adresse);
  const tailleOpcode = 1;
  return {
    opcode,
    parametres,
    nextAdresse: adresse + tailleOpcode + parametres.length
  };
}

export function getOpcode(valeur) {
  const v = String(valeur);
  return Number(v.substring(v.length - 2, v.length));
}

export function getParametres(programme, adresse) {
  const opcodeCourant = programme[adresse];
  return getModesDesParametres(opcodeCourant).map((mode, index) => {
    const adresseDuParametre = adresse + index + 1;
    return mode(adresseDuParametre).value(programme);
  });
}

export function getModesDesParametres(opcodeRiche) {
  const parametreParMode = {
    0: PositionParameter,
    1: ImmediateParameter
  };
  const jusqua5 = 5 - String(opcodeRiche).length;
  const instructionSur5 = `${"0".repeat(jusqua5)}${opcodeRiche}`;

  const [modeP3, modeP2, modeP1] = instructionSur5;

  return [
    parametreParMode[modeP1],
    parametreParMode[modeP2],
    ImmediateParameter
  ];
}

export function appliquer(instruction, programme) {
  const {
    opcode,
    parametres: [p1, p2, p3]
  } = instruction;

  const appliquerOpcode = {
    [OP_CODES.ADD]: () => {
      const resultat = [...programme];
      resultat[p3] = p1 + p2;
      return resultat;
    },
    [OP_CODES.MULTIPLY]: () => {
      const resultat = [...programme];
      resultat[p3] = p1 * p2;
      return resultat;
    }
  };

  return appliquerOpcode[opcode]();
}
