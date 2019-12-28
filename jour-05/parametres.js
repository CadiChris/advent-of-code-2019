export const PositionParameter = (adresseDuParametre, ram) => ({
  value: () => {
    return ram.get(ram.get(adresseDuParametre));
  },
  write: valeur => {
    const position = ram.get(adresseDuParametre);
    ram.set(position, valeur);
  }
});
export const ImmediateParameter = (adresseDuParametre, ram) => ({
  value: () => ram.get(adresseDuParametre)
});

export const RELATIVE_BASE = {
  _value: 0,
  reset() {
    this._value = 0;
  },
  value() {
    return this._value;
  },
  update(value) {
    this._value += value;
  }
};
export const RelativeParameter = (adresse, ram) => ({
  value: () => ram.get(ram.get(adresse) + RELATIVE_BASE.value()),
  write: value => ram.set(ram.get(adresse) + RELATIVE_BASE.value(), value)
});

const PARAMETRE_PAR_MODE = {
  0: PositionParameter,
  1: ImmediateParameter,
  2: RelativeParameter
};

export function getUnParametre(ram, adresse) {
  const modeP1 = intCodeSur5(ram.get(adresse))[2];
  return PARAMETRE_PAR_MODE[modeP1](adresse + 1, ram);
}

export function getDeuxParametres(ram, adresse) {
  const modeP1 = intCodeSur5(ram.get(adresse))[2];
  const modeP2 = intCodeSur5(ram.get(adresse))[1];
  return [
    PARAMETRE_PAR_MODE[modeP1](adresse + 1, ram),
    PARAMETRE_PAR_MODE[modeP2](adresse + 2, ram)
  ];
}

export function getTroisParametres(ram, adresse) {
  const [modeP3, modeP2, modeP1] = intCodeSur5(ram.get(adresse));
  return [
    PARAMETRE_PAR_MODE[modeP1](adresse + 1, ram),
    PARAMETRE_PAR_MODE[modeP2](adresse + 2, ram),
    PARAMETRE_PAR_MODE[modeP3](adresse + 3, ram)
  ];
}

function intCodeSur5(intCode) {
  const jusqua5 = 5 - String(intCode).length;
  return `${"0".repeat(jusqua5)}${intCode}`;
}
