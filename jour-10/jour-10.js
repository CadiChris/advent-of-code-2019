export function stationOrbitale(map) {
  let station = { x: 0, y: 0, detections: 0 };
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      if (!estUnAsteroide(x, y, map)) continue;

      const detections = asteroide(x, y).detecteDans(map);
      if (detections > station.detections) station = { x, y, detections };
    }
  }
  return station;
}

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
  const alpha = yB - yA;
  const beta = yA * xB - yB * xA;

  let direction = xA < xB ? 1 : -1;

  for (let x = xA + direction; x !== xB; x += direction) {
    const yFoisXbMoinsXa = alpha * x + beta;
    const collision = yFoisXbMoinsXa % (xB - xA) === 0;
    if (collision && estUnAsteroide(x, yFoisXbMoinsXa / (xB - xA), map))
      return false;
  }
  return true;
}

function estUnAsteroide(x, y, map) {
  return map[y].split("")[x] === "#";
}
