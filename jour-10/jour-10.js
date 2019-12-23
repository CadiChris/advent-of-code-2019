export function asteroide(x, y) {
  return {
    x,
    y,
    voit(autre, map) {
      const { x: xB, y: yB } = autre;
      const xA = x;
      const yA = y;

      return xA !== xB
        ? pasLeMemeX(xA, xB, yA, yB, map)
        : leMemeX(xA, xB, yA, yB, map);
    }
  };
}

function leMemeX(xA, xB, yA, yB, map) {
  let direction = yA < yB ? 1 : -1;
  for (let y = yA + direction; y !== yB; y += direction) {
    const toucheAsteroide = map[y].split("")[xA] === "#";
    if (toucheAsteroide) return false;
  }
  return true;
}

function pasLeMemeX(xA, xB, yA, yB, map) {
  const alpha = (yB - yA) / (xB - xA);
  const beta = (yA * xB - yB * xA) / (xB - xA);

  let direction = xA < xB ? 1 : -1;

  for (let x = xA + direction; x !== xB; x += direction) {
    const y = alpha * x + beta;
    const collision = Number.isInteger(y);
    if (collision) {
      const avecAsteroide = map[y].split("")[x] === "#";
      if (avecAsteroide) return false;
    }
  }
  return true;
}
