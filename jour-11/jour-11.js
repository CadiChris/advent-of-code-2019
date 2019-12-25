export const Grille = () => {
  const cellules = new Map();
  let xMax = 0,
    xMin = 0,
    yMax = 0,
    yMin = 0;

  return {
    get({ x, y }) {
      return cellules.get(`${x},${y}`) || NOIR;
    },
    peindre({ x, y }, couleur) {
      cellules.set(`${x},${y}`, couleur);
      xMax = Math.max(x, xMax);
      xMin = Math.min(x, xMin);
      yMax = Math.max(y, yMax);
      yMin = Math.min(y, yMin);
    },
    peinture() {
      return cellules.size;
    },
    afficher() {
      let toile = "";
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          toile += this.get({ x, y });
        }
        toile += "\n";
      }
      console.log(toile);
    }
  };
};
export const BLANC = "⬜";
export const NOIR = "⬛";
