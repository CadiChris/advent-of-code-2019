export function range(debut, fin) {
  return [...new Array(fin - debut + 1)].map((_, index) => debut + index);
}

export const criteres = {
  chiffresAdjacents(mot) {
    const groupes = String(mot)
      .split("")
      .reduce(
        (tri, chiffre) => ({ ...tri, [chiffre]: (tri[chiffre] || 0) + 1 }),
        {}
      );

    return Object.values(groupes).includes(2);
  },

  chiffresEgauxOuCroissent(mot) {
    const chiffres = String(mot).split("");

    for (let i = 0; i < chiffres.length - 1; i++)
      if (chiffres[i + 1] < chiffres[i]) return false;

    return true;
  }
};
