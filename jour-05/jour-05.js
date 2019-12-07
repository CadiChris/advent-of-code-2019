export const OP_CODES = { ADD: 1, MULTIPLY: 2, HALT: 99, INPUT: 3, OUTPUT: 4 };

export const PositionParameter = adresse => ({
  value: programme => programme[adresse]
});

export const ImmediateParameter = adresseDuParametre => ({
  value: () => adresseDuParametre
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
  const opCode = getOpcode(opcodeRiche);

  const parametresParOpcode = {
    [OP_CODES.ADD]: () => [
      parametreParMode[modeP1],
      parametreParMode[modeP2],
      parametreParMode[modeP3]
    ],
    [OP_CODES.MULTIPLY]: () => [
      parametreParMode[modeP1],
      parametreParMode[modeP2],
      parametreParMode[modeP3]
    ],
    [OP_CODES.INPUT]: () => [parametreParMode[modeP1]],
    [OP_CODES.OUTPUT]: () => [parametreParMode[modeP1]]
  };

  return parametresParOpcode[opCode]();
}

const INPUT_HARDCODE = 1;
export function appliquer(instruction, programme) {
  const {
    opcode,
    parametres: [p1, p2, p3]
  } = instruction;

  const appliquerOpcode = {
    [OP_CODES.ADD]: () => {
      const resultat = [...programme];
      resultat[p3] = resultat[p1] + resultat[p2];
      return resultat;
    },
    [OP_CODES.MULTIPLY]: () => {
      const resultat = [...programme];
      resultat[p3] = resultat[p1] * resultat[p2];
      return resultat;
    },
    [OP_CODES.INPUT]: () => {
      const resultat = [...programme];
      resultat[p1] = INPUT_HARDCODE;
      return resultat;
    },
    [OP_CODES.OUTPUT]: () => {
      console.log(programme[p1]);
      return programme;
    }
  };

  return appliquerOpcode[opcode]();
}
