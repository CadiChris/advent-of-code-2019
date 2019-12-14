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
