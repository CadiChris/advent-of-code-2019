export const OP_CODES = { ADD: 1, MULTIPLY: 2, HALT: 99, INPUT: 3, OUTPUT: 4 };

export const PositionParameter = adresse => ({
  value: programme => programme[adresse]
});

export const ImmediateParameter = adresseDuParametre => ({
  value: () => adresseDuParametre
});

const PARAMETRE_PAR_MODE = { 0: PositionParameter, 1: ImmediateParameter };

const Add = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = this.getParametres(programme);
    const resultat = [...programme];
    resultat[p3] = resultat[p1] + resultat[p2];
    return resultat;
  },
  getParametres(programme) {
    const [modeP3, modeP2, modeP1] = opcodeSur5(programme[adresse]);
    return [
      PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme),
      PARAMETRE_PAR_MODE[modeP2](adresse + 2).value(programme),
      PARAMETRE_PAR_MODE[modeP3](adresse + 3).value(programme)
    ];
  }
});

const Multiply = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = this.getParametres(programme);
    const resultat = [...programme];
    resultat[p3] = resultat[p1] * resultat[p2];
    return resultat;
  },
  getParametres(programme) {
    const [modeP3, modeP2, modeP1] = opcodeSur5(programme[adresse]);
    return [
      PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme),
      PARAMETRE_PAR_MODE[modeP2](adresse + 2).value(programme),
      PARAMETRE_PAR_MODE[modeP3](adresse + 3).value(programme)
    ];
  }
});

const Input = adresse => ({
  executer(programme) {
    const p1 = this.getParametre(programme);
    const resultat = [...programme];
    resultat[p1] = INPUT_HARDCODE;
    return resultat;
  },
  getParametre(programme) {
    const modeP1 = opcodeSur5(programme[adresse])[2];
    return PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme);
  }
});

const Output = adresse => ({
  executer(programme) {
    const p1 = this.getParametre(programme);
    console.log(programme[p1]);
    return programme;
  },
  getParametre(programme) {
    const modeP1 = opcodeSur5(programme[adresse])[2];
    return PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme);
  }
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
    adresse,
    nextAdresse: adresse + tailleOpcode + parametres.length
  };
}

export function getOpcode(valeur) {
  const v = String(valeur);
  return Number(v.substring(v.length - 2, v.length));
}

export function getParametres(programme, adresse) {
  return getModesDesParametres(programme, adresse).map((mode, index) => {
    const adresseDuParametre = adresse + index + 1;
    return mode(adresseDuParametre).value(programme);
  });
}

export function getModesDesParametres(programme, adresse) {
  const [modeP3, modeP2, modeP1] = opcodeSur5(programme[adresse]);
  const opCode = getOpcode(programme[adresse]);

  const parametresParOpcode = {
    [OP_CODES.ADD]: () => [
      PARAMETRE_PAR_MODE[modeP1],
      PARAMETRE_PAR_MODE[modeP2],
      PARAMETRE_PAR_MODE[modeP3]
    ],
    [OP_CODES.MULTIPLY]: () => [
      PARAMETRE_PAR_MODE[modeP1],
      PARAMETRE_PAR_MODE[modeP2],
      PARAMETRE_PAR_MODE[modeP3]
    ],
    [OP_CODES.INPUT]: () => [PARAMETRE_PAR_MODE[modeP1]],
    [OP_CODES.OUTPUT]: () => [PARAMETRE_PAR_MODE[modeP1]]
  };

  return parametresParOpcode[opCode]();
}

const INPUT_HARDCODE = 1;

export function appliquer(instruction, programme) {
  const { opcode, adresse } = instruction;

  const appliquerOpcode = {
    [OP_CODES.ADD]: () => Add(adresse).executer(programme),
    [OP_CODES.MULTIPLY]: () => Multiply(adresse).executer(programme),
    [OP_CODES.INPUT]: () => Input(adresse).executer(programme),
    [OP_CODES.OUTPUT]: () => Output(adresse).executer(programme)
  };

  return appliquerOpcode[opcode]();
}

function opcodeSur5(opcodeRiche) {
  const jusqua5 = 5 - String(opcodeRiche).length;
  const instructionSur5 = `${"0".repeat(jusqua5)}${opcodeRiche}`;
  return instructionSur5;
}
