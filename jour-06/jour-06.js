export function enMap(orbites) {
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

  return laMap;
}

export function getCom(orbites) {
  const laMap = enMap(orbites);

  return laMap.get("COM");
}

class Arbre {
  constructor() {
    this.children = [];
    this.parent = null;
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }
}

export function toutesLesDistances(orbites) {
  const arbre = getCom(orbites);
  return distanceRec(arbre, 0);
}

function distanceRec(unArbre, uneDistance) {
  let accumulateur = uneDistance;
  for (const child of unArbre.children) {
    accumulateur += distanceRec(child, uneDistance + 1);
  }
  return accumulateur;
}

export function parentsDe(unArbre) {
  let parents = [];
  let leParent = unArbre.parent;
  while (leParent) {
    parents.push(leParent);
    leParent = leParent.parent;
  }
  return parents;
}

export function distancePrefixe(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;

  while (i >= 0 && j >= 0 && a[i] === b[j]) {
    i--;
    j--;
  }

  return i + j + 2;
}
