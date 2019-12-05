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
    const triee = String(mot).split("").sort().join("")
    return String(mot) === triee
  }
};
