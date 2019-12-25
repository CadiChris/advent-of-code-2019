export const combinaisonsPart1 = combinaisonsAvecUnicite(0, 4);
export const combinaisonsPart2 = combinaisonsAvecUnicite(5, 9);

export function combinaisonsAvecUnicite(min, max) {
  let resultat = [];
  for (let a = min; a <= max; a++)
    for (let b = min; b <= max; b++)
      for (let c = min; c <= max; c++)
        for (let d = min; d <= max; d++)
          for (let e = min; e <= max; e++) {
            const unicite = new Set([a, b, c, d, e]).size === 5;
            if (unicite) resultat.push([a, b, c, d, e]);
          }

  return resultat;
}
