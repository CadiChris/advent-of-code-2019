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
    },

    detecteDans(map) {
      let detections = 0;
      for (let xB = 0; xB < map[0].length; xB++) {
        for (let yB = 0; yB < map.length; yB++) {
          const maPosition = x === xB && y === yB;
          if (maPosition) continue;

          if (estUnAsteroide(xB, yB, map) && this.voit(asteroide(xB, yB), map))
            detections++;
        }
      }

      return detections;
    }
  };
}

function leMemeX(xA, xB, yA, yB, map) {
  let direction = yA < yB ? 1 : -1;
  for (let y = yA + direction; y !== yB; y += direction) {
    const toucheAsteroide = estUnAsteroide(xA, y, map);
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
    if (collision && estUnAsteroide(x, y, map)) return false;
  }
  return true;
}

function estUnAsteroide(x, y, map) {
  return map[y].split("")[x] === "#";
}
