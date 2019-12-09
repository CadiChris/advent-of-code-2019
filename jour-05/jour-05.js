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

export const inputValues = values => ({
  nextValue: () => values.shift()
});
export const Input = (adresse, inputs) => ({
  executer(programme) {
    const p1 = this.getParametre(programme);
    const resultat = [...programme];
    resultat[p1] = inputs.nextValue();
    return resultat;
  },
  getParametre(programme) {
    const modeP1 = intCodeSur5(programme[adresse])[2];
    return PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme);
  },
  nextAdresse: () => adresse + 2
});

export const Output = (adresse, outputFn) => ({
  executer(programme) {
    const p1 = this.getParametre(programme);
    outputFn(programme[p1]);
    return programme;
  },
  getParametre(programme) {
    const modeP1 = intCodeSur5(programme[adresse])[2];
    return PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme);
  },
  nextAdresse: () => adresse + 2
});

export const Equals = adresse => ({
  executer(programme) {
    const resultat = [...programme];
    const [p1, p2, p3] = this.getParametres(programme);
    if (programme[p1] === programme[p2]) resultat[p3] = 1;
    else resultat[p3] = 0;
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

export const OP_CODES = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  EQUALS: 8,
  HALT: 99,
};

export const ADRESSE_DEPART = 0;
export function executer(programme, { inputs, outputFn } = {}) {
  let instruction = getInstruction(programme, ADRESSE_DEPART, {
    inputs,
    outputFn
  });
  while (instruction.opcode !== OP_CODES.HALT) {
    const { operation } = instruction;
    programme = operation.executer(programme);
    instruction = getInstruction(programme, operation.nextAdresse(), {
      inputs,
      outputFn
    });
  }
  return programme;
}

export function getInstruction(programme, adresse, { inputs, outputFn }) {
  const opcode = getOpcode(programme[adresse]);
  if (opcode === OP_CODES.HALT) return { opcode: OP_CODES.HALT };

  const OPERATION_PAR_OPCODE = {
    [OP_CODES.ADD]: () => Add(adresse),
    [OP_CODES.MULTIPLY]: () => Multiply(adresse),
    [OP_CODES.INPUT]: () => Input(adresse, inputs),
    [OP_CODES.OUTPUT]: () => Output(adresse, outputFn),
    [OP_CODES.EQUALS]: () => Equals(adresse)
  };

  return {
    opcode,
    operation: OPERATION_PAR_OPCODE[opcode]()
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
