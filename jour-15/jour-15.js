export function oxygener(mapComplete) {
  let resultat = [...mapComplete];

  let changed = false;

  for (let y = 0; y < 39; y++)
    for (let x = 0; x < 40; x++) {
      const cell = mapComplete[y][x];
      const estVide = cell === " ";
      if (!estVide) continue;

      const gauche = x > 0 && mapComplete[y][x - 1] === "O";
      const droite = x < 39 && mapComplete[y][x + 1] === "O";
      const haut = y > 0 && mapComplete[y - 1][x] === "O";
      const bas = y < 38 && mapComplete[y + 1][x] === "O";

      if (gauche || droite || haut || bas) {
        const ligne = resultat[y].split("");
        ligne[x] = "O";
        resultat[y] = ligne.join("");
        changed = true;
      }
    }

  if (changed) return resultat;
  return null;
}

export function oxygenerCompletement(mapComplete) {
  let tempsNecessaire = 0;

  while ((mapComplete = oxygener(mapComplete))) {
    tempsNecessaire++;
  }

  return tempsNecessaire;
}
