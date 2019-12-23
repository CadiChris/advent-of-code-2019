import {
  getDeuxParametres,
  getTroisParametres,
  getUnParametre,
  RELATIVE_BASE
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
  ADJUST_RELATIVE_BASE: 9,
  HALT: 99
};

export function getOperation(ram, adresse, { inputs, outputFn }) {
  const opcode = getOpcode(ram.get(adresse));
  if (opcode === OP_CODES.HALT) return { opcode: OP_CODES.HALT };

  const OPERATION_PAR_OPCODE = {
    [OP_CODES.ADD]: () => Add(adresse),
    [OP_CODES.MULTIPLY]: () => Multiply(adresse),
    [OP_CODES.INPUT]: () => Input(adresse, inputs),
    [OP_CODES.OUTPUT]: () => Output(adresse, outputFn),
    [OP_CODES.JUMP_IF_TRUE]: () => JumpIfTrue(adresse),
    [OP_CODES.JUMP_IF_FALSE]: () => JumpIfFalse(adresse),
    [OP_CODES.LESS_THAN]: () => LessThan(adresse),
    [OP_CODES.EQUALS]: () => Equals(adresse),
    [OP_CODES.ADJUST_RELATIVE_BASE]: () => AdjustRelativeBase(adresse)
  };

  return {
    opcode,
    operation: OPERATION_PAR_OPCODE[opcode]()
  };
}

export const Add = adresse => ({
  executer(ram) {
    const [p1, p2, p3] = getTroisParametres(ram, adresse);
    ram.set(p3, ram.get(p1) + ram.get(p2));
  },
  nextAdresse: () => adresse + 4
});

export const Multiply = adresse => ({
  executer(ram) {
    const [p1, p2, p3] = getTroisParametres(ram, adresse);
    ram.set(p3, ram.get(p1) * ram.get(p2));
  },
  nextAdresse: () => adresse + 4
});

export const inputValues = values => ({
  nextValue: () => values.shift()
});
export const Input = (adresse, inputs) => ({
  executer(ram) {
    const p1 = getUnParametre(ram, adresse);
    ram.set(p1, inputs.nextValue());
  },
  nextAdresse: () => adresse + 2
});

export const Output = (adresse, outputFn) => ({
  executer(ram) {
    const p1 = getUnParametre(ram, adresse);
    outputFn(ram.get(p1));
  },
  nextAdresse: () => adresse + 2
});

const JumpIfTrue = adresse => ({
  executer(ram) {
    const [p1, p2] = getDeuxParametres(ram, adresse);
    if (ram.get(p1) !== 0) this._nextAdresse = ram.get(p2);
    else this._nextAdresse = adresse + 3;
  },
  nextAdresse() {
    return this._nextAdresse;
  }
});

const JumpIfFalse = adresse => ({
  executer(ram) {
    const [p1, p2] = getDeuxParametres(ram, adresse);
    if (ram.get(p1) === 0) this._nextAdresse = ram.get(p2);
    else this._nextAdresse = adresse + 3;
  },
  nextAdresse() {
    return this._nextAdresse;
  }
});

export const Equals = adresse => ({
  executer(ram) {
    const [p1, p2, p3] = getTroisParametres(ram, adresse);
    if (ram.get(p1) === ram.get(p2)) ram.set(p3, 1);
    else ram.set(p3, 0);
  },
  nextAdresse: () => adresse + 4
});

export const LessThan = adresse => ({
  executer(ram) {
    const [p1, p2, p3] = getTroisParametres(ram, adresse);
    if (ram.get(p1) < ram.get(p2)) ram.set(p3, 1);
    else ram.set(p3, 0);
  },
  nextAdresse: () => adresse + 4
});

const AdjustRelativeBase = adresse => ({
  executer(ram) {
    const p1 = getUnParametre(ram, adresse);
    RELATIVE_BASE.update(ram.get(p1));
  },
  nextAdresse: () => adresse + 2
});

export function getOpcode(intCode) {
  const v = String(intCode);
  return Number(v.substring(v.length - 2, v.length));
}
