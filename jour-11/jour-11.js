export const Robot = terrain => {
  return {
    position: { x: 0, y: 0, orientation: 0 },
    camera() {
      const codes = { [BLANC]: 1, [NOIR]: 0 };
      const couleurSurvolee = codes[terrain.get(this.position)];
      return { couleurSurvolee };
    },
    peindre(couleur) {
      terrain.peindre(this.position, couleur);
    },
    deplacer(angle) {
      this.position.orientation = (this.position.orientation + angle) % 360;
      const { orientation } = this.position;
      if (orientation === 0) this.position.y += 1;
      else if (orientation === 90) this.position.x += 1;
      else if (orientation === 180) this.position.y -= 1;
      else if (orientation === 270) this.position.x -= 1;
    }
  };
};

export const ControleDeRobot = robot => {
  const TOURNER = 1;
  const PEINDRE = 0;

  let tournerOuPeindre = PEINDRE;

  function peindre(codeCouleur) {
    const pinceaux = { [1]: BLANC, [0]: NOIR };
    const couleur = pinceaux[codeCouleur];
    robot.peindre(couleur);
  }

  function bouger(codeAngle) {
    const angle = codeAngle === 0 ? 270 : 90;
    robot.deplacer(angle);
  }

  return {
    controler(outputDuProgramme) {
      if (tournerOuPeindre === PEINDRE) {
        peindre(outputDuProgramme);
        tournerOuPeindre = TOURNER;
      } else {
        bouger(outputDuProgramme);
        tournerOuPeindre = PEINDRE;
      }
    }
  };
};

export const Terrain = () => {
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
