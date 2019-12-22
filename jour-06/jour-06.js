export function enArbre(orbites) {
  const laMap = new Map();

  for (const o of orbites) {
    const [left, right] = o.split(")");

    if (!laMap.has(left)) {
      laMap.set(left, new Arbre());
    }
    if (!laMap.has(right)) {
      laMap.set(right, new Arbre());
    }

    laMap.get(left).addChild(laMap.get(right));
  }

  return laMap.get("COM");
}

class Arbre {
  constructor() {
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }
}

export function toutesLesDistances(orbites) {
  const arbre = enArbre(orbites);
  return distanceRec(arbre, 0);
}

function distanceRec(unArbre, uneDistance) {
  let accumulateur = uneDistance;
  for (const child of unArbre.children) {
    accumulateur += distanceRec(child, uneDistance + 1);
  }
  return accumulateur;
}
