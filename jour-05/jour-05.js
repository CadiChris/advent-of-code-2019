import { getOperation, OP_CODES } from "./operations";
import { RELATIVE_BASE } from "./parametres";

export const ordinateur = programme => {
  const ram = enRam(programme);

  const ADRESSE_DEPART = 0;
  let adresse = ADRESSE_DEPART;
  RELATIVE_BASE.reset();

  return {
    executer({ inputs, outputFn } = {}) {
      while (this.unTick({ inputs, outputFn })) {}
      return ram.contenu();
    },
    unTick({ inputs, outputFn } = {}) {
      const instruction = getOperation(ram, adresse, { inputs, outputFn });
      if (instruction.opcode === OP_CODES.HALT) return false;
      instruction.operation.executer(ram);
      adresse = instruction.operation.nextAdresse();
      return true;
    }
  };
};

export function executer(programme, { inputs, outputFn } = {}) {
  return ordinateur(programme).executer({ inputs, outputFn });
}

export function enRam(programme) {
  const copie = [...programme];
  return {
    get: adresse => copie[adresse] || 0,
    set: (adresse, valeur) => (copie[adresse] = valeur),
    contenu: () => copie
  };
}
