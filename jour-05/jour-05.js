import { getOperation, OP_CODES } from "./operations";

export const ADRESSE_DEPART = 0;
export function executer(programme, { inputs, outputFn } = {}) {
  let resultat = [...programme];
  let instruction = getOperation(resultat, ADRESSE_DEPART, {
    inputs,
    outputFn
  });
  while (instruction.opcode !== OP_CODES.HALT) {
    const { operation } = instruction;
    operation.executer(resultat);
    instruction = getOperation(resultat, operation.nextAdresse(), {
      inputs,
      outputFn
    });
  }
  return resultat;
}
