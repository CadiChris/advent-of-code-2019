export const combinaisonsPhases = combinaisonsAvecUnicite();

export function combinaisonsAvecUnicite() {
  let resultat = [];
  const max = 5;
  for (let a = 0; a < max; a++)
    for (let b = 0; b < max; b++)
      for (let c = 0; c < max; c++)
        for (let d = 0; d < max; d++)
          for (let e = 0; e < max; e++) {
            const unicite = new Set([a, b, c, d, e]).size === 5;
            if (unicite) resultat.push([a, b, c, d, e]);
          }

  return resultat;
}
