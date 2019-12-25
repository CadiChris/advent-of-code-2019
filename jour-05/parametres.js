export const PositionParameter = adresse => ({
  value: memoire => memoire.get(adresse)
});
export const ImmediateParameter = adresseDuParametre => ({
  value: () => adresseDuParametre
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
export const RelativeParameter = adresse => ({
  value: memoire => memoire.get(adresse) + RELATIVE_BASE.value()
});

const PARAMETRE_PAR_MODE = {
  0: PositionParameter,
  1: ImmediateParameter,
  2: RelativeParameter
};

export function getUnParametre(memoire, adresse) {
  const modeP1 = intCodeSur5(memoire.get(adresse))[2];
  return PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(memoire);
}

export function getDeuxParametres(memoire, adresse) {
  const modeP1 = intCodeSur5(memoire.get(adresse))[2];
  const modeP2 = intCodeSur5(memoire.get(adresse))[1];
  return [
    PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(memoire),
    PARAMETRE_PAR_MODE[modeP2](adresse + 2).value(memoire)
  ];
}

export function getTroisParametres(memoire, adresse) {
  const [modeP3, modeP2, modeP1] = intCodeSur5(memoire.get(adresse));
  return [
    PARAMETRE_PAR_MODE[modeP1](adresse + 1).value(memoire),
    PARAMETRE_PAR_MODE[modeP2](adresse + 2).value(memoire),
    PARAMETRE_PAR_MODE[modeP3](adresse + 3).value(memoire)
  ];
}

function intCodeSur5(intCode) {
  const jusqua5 = 5 - String(intCode).length;
  return `${"0".repeat(jusqua5)}${intCode}`;
}
