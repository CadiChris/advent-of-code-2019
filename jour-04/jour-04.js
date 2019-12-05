export function range(debut, fin) {
  return [...new Array(fin - debut + 1)].map((_, index) => debut + index);
}

export const criteres = {
  chiffresAdacents(mot) {
    const adjacents = new RegExp(/(\d)\1+/);
    return adjacents.test(mot);
  },

  chiffresEgauxOuCroissent(mot) {
    const chiffres = String(mot).split("");

    for (let i = 0; i < chiffres.length - 1; i++)
      if (chiffres[i + 1] < chiffres[i]) return false;

    return true;
  }
};
