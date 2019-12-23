import { getOperation, OP_CODES } from "./operations";

export const ADRESSE_DEPART = 0;

export function executer(programme, { inputs, outputFn } = {}) {
  let ram = enRam(programme);
  let instruction = getOperation(ram, ADRESSE_DEPART, {
    inputs,
    outputFn
  });

  while (instruction.opcode !== OP_CODES.HALT) {
    const { operation } = instruction;
    operation.executer(ram);
    instruction = getOperation(ram, operation.nextAdresse(), {
      inputs,
      outputFn
    });
  }

  return ram.contenu();
}

export function enRam(programme) {
  const copie = [...programme];
  return {
    get: adresse => copie[adresse] || 0,
    set: (adresse, valeur) => (copie[adresse] = valeur),
    contenu: () => copie
  };
}
