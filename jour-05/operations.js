import {
  getDeuxParametres,
  getTroisParametres,
  getUnParametre
} from "./parametres";

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

export function getOperation(programme, adresse, { inputs, outputFn }) {
  const opcode = getOpcode(programme[adresse]);
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

export const Add = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = getTroisParametres(programme, adresse);
    programme[p3] = programme[p1] + programme[p2];
  },
  nextAdresse: () => adresse + 4
});

export const Multiply = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = getTroisParametres(programme, adresse);
    programme[p3] = programme[p1] * programme[p2];
  },
  nextAdresse: () => adresse + 4
});
export const inputValues = values => ({
  nextValue: () => values.shift()
});

export const Input = (adresse, inputs) => ({
  executer(programme) {
    const p1 = getUnParametre(programme, adresse);
    programme[p1] = inputs.nextValue();
  },
  nextAdresse: () => adresse + 2
});

export const Output = (adresse, outputFn) => ({
  executer(programme) {
    const p1 = getUnParametre(programme, adresse);
    outputFn(programme[p1]);
  },
  nextAdresse: () => adresse + 2
});

const JumpIfTrue = adresse => ({
  executer(programme) {
    const [p1, p2] = getDeuxParametres(programme, adresse);
    if (programme[p1] !== 0) this._nextAdresse = programme[p2];
    else this._nextAdresse = adresse + 3;
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
  },
  nextAdresse() {
    return this._nextAdresse;
  }
});

export const Equals = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = getTroisParametres(programme, adresse);
    if (programme[p1] === programme[p2]) programme[p3] = 1;
    else programme[p3] = 0;
  },
  nextAdresse: () => adresse + 4
});

export const LessThan = adresse => ({
  executer(programme) {
    const [p1, p2, p3] = getTroisParametres(programme, adresse);
    if (programme[p1] < programme[p2]) programme[p3] = 1;
    else programme[p3] = 0;
  },
  nextAdresse: () => adresse + 4
});

export function getOpcode(intCode) {
  const v = String(intCode);
  return Number(v.substring(v.length - 2, v.length));
}
