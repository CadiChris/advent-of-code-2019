export function range(debut, fin) {
  return [...new Array(fin - debut + 1)].map((_, index) => debut + index);
}

export const criteres = {
  chiffresAdacents(mot) {
    const adjacents = new RegExp(/(\d)\1+/);
    return adjacents.test(mot);
  }
};
