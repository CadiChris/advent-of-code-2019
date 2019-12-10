import { executer, inputValues } from "../jour-05/jour-05";

export function amplifier(phases, programme) {
  return phases.reduce((outputPrecedent, phase) => {
    const output = [];
    const recordOutput = o => output.push(o);

    executer(programme, {
      inputs: inputValues([phase, outputPrecedent]),
      outputFn: recordOutput
    });

    return output.pop();
  }, 0);
}
