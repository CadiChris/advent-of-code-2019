export function calques(pixels, dimensions) {
  const { largeur, hauteur } = dimensions;
  const tailleDeCalque = hauteur * largeur;
  const nombreDeCalques = pixels.length / tailleDeCalque;
  const calques = [];
  for (let i = 0; i < nombreDeCalques; i++) {
    const debut = i * tailleDeCalque;
    const calqueEntier = pixels.substring(debut, debut + tailleDeCalque);
    calques.push(calqueEntier);
  }

  return calques;
}

export function lignes(pixels, dimensions) {
  const { largeur, hauteur } = dimensions;
  const lignes = [];
  for (let i = 0; i < hauteur; i++) {
    const debut = i * largeur;
    lignes.push(pixels.substring(debut, debut + largeur));
  }
  return lignes;
}

export const compte = (pixels, recherche) =>
  (pixels.match(new RegExp(recherche, "g")) || []).length;

export function moinsDe0(calques) {
  return calques.reduce((min, calque) =>
    compte(min, "0") < compte(calque, "0") ? min : calque
  );
}

export const COULEURS = { NOIR: "0", BLANC: "1" };
const estDeCouleur = pixel => Object.values(COULEURS).includes(pixel);

export function couleur(calquesLignes, coord) {
  for (const calque of calquesLignes) {
    const ligne = calque[coord.ligne - 1];
    const pixel = ligne[coord.colonne - 1];
    if (estDeCouleur(pixel)) return pixel;
  }
}

export function decompose(pixels, dimensions) {
  return calques(pixels, dimensions).map(c => lignes(c, dimensions));
}

export function decode(pixels, dimensions) {
  const decomposition = decompose(pixels, dimensions);
  const image = [];
  for (let ligne = 1; ligne <= dimensions.hauteur; ligne++) {
    let pixelsLigne = "";
    for (let colonne = 1; colonne <= dimensions.largeur; colonne++) {
      pixelsLigne += couleur(decomposition, { ligne, colonne });
    }
    image.push(pixelsLigne);
  }
  return image;
}
