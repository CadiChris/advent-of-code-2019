export const PositionParameter = adresse => ({
  value: programme => programme[adresse]
});
export const ImmediateParameter = adresseDuParametre => ({
  value: () => adresseDuParametre
});

const PARAMETRE_PAR_MODE = { 0: PositionParameter, 1: ImmediateParameter };

export function getUnParametre(programme, adresse) {
  const modeP1 = intCodeSur5(programme[adresse])[2];
  return PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme);
}

export function getDeuxParametres(programme, adresse) {
  const modeP1 = intCodeSur5(programme[adresse])[2];
  const modeP2 = intCodeSur5(programme[adresse])[1];
  return [
    PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme),
    PARAMETRE_PAR_MODE[modeP2](adresse + 2).value(programme)
  ];
}

export function getTroisParametres(programme, adresse) {
  const [modeP3, modeP2, modeP1] = intCodeSur5(programme[adresse]);
  return [
    PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(programme),
    PARAMETRE_PAR_MODE[modeP2](adresse + 2).value(programme),
    PARAMETRE_PAR_MODE[modeP3](adresse + 3).value(programme)
  ];
}

function intCodeSur5(intCode) {
  const jusqua5 = 5 - String(intCode).length;
  return `${"0".repeat(jusqua5)}${intCode}`;
}

export const Add = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = getTroisParametres(programme, adresse);
    const resultat = [...programme];
    resultat[p3] = resultat[p1] + resultat[p2];
    return resultat;
  },
  nextAdresse: () => adresse + 4
});

export const Multiply = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = getTroisParametres(programme, adresse);
    const resultat = [...programme];
    resultat[p3] = resultat[p1] * resultat[p2];
    return resultat;
  },
  nextAdresse: () => adresse + 4
});

export const inputValues = values => ({
  nextValue: () => values.shift()
});
export const Input = (adresse, inputs) => ({
  executer(programme) {
    const p1 = getUnParametre(programme, adresse);
    const resultat = [...programme];
    resultat[p1] = inputs.nextValue();
    return resultat;
  },
  nextAdresse: () => adresse + 2
});

export const Output = (adresse, outputFn) => ({
  executer(programme) {
    const p1 = getUnParametre(programme, adresse);
    outputFn(programme[p1]);
    return programme;
  },
  nextAdresse: () => adresse + 2
});

const JumpIfTrue = adresse => ({
  executer(programme) {
    const [p1, p2] = getDeuxParametres(programme, adresse);
    if (programme[p1] !== 0) this._nextAdresse = programme[p2];
    else this._nextAdresse = adresse + 3;
    return programme;
  },
  nextAdresse() {
    return this._nextAdresse;
  }
});

const JumpIfFalse = adresse => ({
  executer(programme) {
    const [p1, p2] = getDeuxParametres(programme, adresse);
    if (programme[p1] === 0) this._nextAdresse = programme[p2];
    else this._nextAdresse = adresse + 3;
    return programme;
  },
  nextAdresse() {
    return this._nextAdresse;
  }
});

export const Equals = adresse => ({
  executer(programme) {
    const resultat = [...programme];
    const [p1, p2, p3] = getTroisParametres(programme, adresse);
    if (programme[p1] === programme[p2]) resultat[p3] = 1;
    else resultat[p3] = 0;
    return resultat;
  },
  nextAdresse: () => adresse + 4
});

export const LessThan = adresse => ({
  executer(programme) {
    const resutat = [...programme];
    const [p1, p2, p3] = getTroisParametres(programme, adresse);
    if (programme[p1] < programme[p2]) resutat[p3] = 1;
    else resutat[p3] = 0;
    return resutat;
  },
  nextAdresse: () => adresse + 4
});

export const OP_CODES = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
  HALT: 99
};

export const ADRESSE_DEPART = 0;
export function executer(programme, { inputs, outputFn } = {}) {
  let resultat = [...programme];
  let instruction = getInstruction(resultat, ADRESSE_DEPART, {
    inputs,
    outputFn
  });
  while (instruction.opcode !== OP_CODES.HALT) {
    const { operation } = instruction;
    resultat = operation.executer(resultat);
    instruction = getInstruction(resultat, operation.nextAdresse(), {
      inputs,
      outputFn
    });
  }
  return resultat;
}

export function getInstruction(programme, adresse, { inputs, outputFn }) {
  const opcode = getOpcode(programme[adresse]); //?
  if (opcode === OP_CODES.HALT) return { opcode: OP_CODES.HALT };

  const OPERATION_PAR_OPCODE = {
    [OP_CODES.ADD]: () => Add(adresse),
    [OP_CODES.MULTIPLY]: () => Multiply(adresse),
    [OP_CODES.INPUT]: () => Input(adresse, inputs),
    [OP_CODES.OUTPUT]: () => Output(adresse, outputFn),
    [OP_CODES.JUMP_IF_TRUE]: () => JumpIfTrue(adresse),
    [OP_CODES.JUMP_IF_FALSE]: () => JumpIfFalse(adresse),
    [OP_CODES.LESS_THAN]: () => LessThan(adresse),
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
