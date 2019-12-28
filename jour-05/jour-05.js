import { getOperation, OP_CODES } from "./operations";
import { RELATIVE_BASE } from "./parametres";

export function executer(programme, { inputs, outputFn } = {}) {
  RELATIVE_BASE.reset();
  let ram = enRam(programme);

  const ADRESSE_DEPART = 0;
  const params = { ram, adresse: ADRESSE_DEPART, inputs, outputFn };

  let nextAdresse;
  while ((nextAdresse = unTick(params))) {
    params.adresse = nextAdresse;
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

function unTick({ ram, adresse, inputs, outputFn }) {
  const instruction = getOperation(ram, adresse, { inputs, outputFn });

  if (instruction.opcode === OP_CODES.HALT) return;

  instruction.operation.executer(ram);

  return instruction.operation.nextAdresse();
}
