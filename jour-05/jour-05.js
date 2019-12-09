export const PositionParameter = adresse => ({
  value: programme => programme[adresse]
});

export const ImmediateParameter = adresseDuParametre => ({
  value: () => adresseDuParametre
});

const PARAMETRE_PAR_MODE = { 0: PositionParameter, 1: ImmediateParameter };

export const Add = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = this.getParametres(programme);
    const resultat = [...programme];
    resultat[p3] = resultat[p1] + resultat[p2];
    return resultat;
  },
  getParametres(programme) {
    const [modeP3, modeP2, modeP1] = intCodeSur5(programme[adresse]);
    return [
      PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme),
      PARAMETRE_PAR_MODE[modeP2](adresse + 2).value(programme),
      PARAMETRE_PAR_MODE[modeP3](adresse + 3).value(programme)
    ];
  },
  nextAdresse: () => adresse + 4
});

export const Multiply = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = this.getParametres(programme);
    const resultat = [...programme];
    resultat[p3] = resultat[p1] * resultat[p2];
    return resultat;
  },
  getParametres(programme) {
    const [modeP3, modeP2, modeP1] = intCodeSur5(programme[adresse]);
    return [
      PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme),
      PARAMETRE_PAR_MODE[modeP2](adresse + 2).value(programme),
      PARAMETRE_PAR_MODE[modeP3](adresse + 3).value(programme)
    ];
  },
  nextAdresse: () => adresse + 4
});

export const Input = adresse => ({
  INPUT_HARDCODE: 1,
  executer(programme) {
    const p1 = this.getParametre(programme);
    const resultat = [...programme];
    resultat[p1] = this.INPUT_HARDCODE;
    return resultat;
  },
  getParametre(programme) {
    const modeP1 = intCodeSur5(programme[adresse])[2];
    return PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme);
  },
  nextAdresse: () => adresse + 2
});

export const Output = adresse => ({
  executer(programme) {
    const p1 = this.getParametre(programme);
    console.log(programme[p1]);
    return programme;
  },
  getParametre(programme) {
    const modeP1 = intCodeSur5(programme[adresse])[2];
    return PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme);
  },
  nextAdresse: () => adresse + 2
});

export const OP_CODES = { ADD: 1, MULTIPLY: 2, HALT: 99, INPUT: 3, OUTPUT: 4 };

const OPERATION_PAR_OPCODE = {
  [OP_CODES.ADD]: Add,
  [OP_CODES.MULTIPLY]: Multiply,
  [OP_CODES.INPUT]: Input,
  [OP_CODES.OUTPUT]: Output
};

export const ADRESSE_DEPART = 0;
export function executer(programme) {
  let instruction = getInstruction(programme, ADRESSE_DEPART);
  while (instruction.opcode !== OP_CODES.HALT) {
    const { operation } = instruction;
    programme = operation.executer(programme);
    instruction = getInstruction(programme, operation.nextAdresse());
  }
  return programme;
}

export function getInstruction(programme, adresse) {
  const opcode = getOpcode(programme[adresse]);
  if (opcode === OP_CODES.HALT) return { opcode: OP_CODES.HALT };

  return {
    opcode,
    operation: OPERATION_PAR_OPCODE[opcode](adresse)
  };
}

export function getOpcode(intCode) {
  const v = String(intCode);
  return Number(v.substring(v.length - 2, v.length));
}

function intCodeSur5(intCode) {
  const jusqua5 = 5 - String(intCode).length;
  return `${"0".repeat(jusqua5)}${intCode}`;
}
