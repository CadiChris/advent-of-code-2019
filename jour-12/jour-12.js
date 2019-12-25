export const Lune = (position, velocite) => ({
  position,
  velocite,
  details: () => {
    const pos = `x=${position.x}, y=${position.y}, z=${position.z}`;
    const vel = `x=${velocite.x}, y=${velocite.y}, z=${velocite.z}`;
    return `pos=<${pos}>, vel=<${vel}>`;
  }
});

export const Position = (x, y, z) => ({ x, y, z });
export const Velocite = (x, y, z) => ({ x, y, z });

export function appliquerGravitation(luneA, luneB) {
  function surAxe(axe) {
    if (luneA.position[axe] < luneB.position[axe]) {
      luneA.velocite[axe] += 1;
      luneB.velocite[axe] -= 1;
    } else if (luneA.position[axe] > luneB.position[axe]) {
      luneA.velocite[axe] -= 1;
      luneB.velocite[axe] += 1;
    }
  }

  surAxe("x");
  surAxe("y");
  surAxe("z");
}

export function appliquerVelocite(lune) {
  lune.position.x += lune.velocite.x;
  lune.position.y += lune.velocite.y;
  lune.position.z += lune.velocite.z;
}

export function creeLune(coords) {
  const [x, y, z] = coords
    .replace("<", "")
    .replace(">", "")
    .split(",");

  const position = Position(
    x.split("=").pop(),
    y.split("=").pop(),
    z.split("=").pop()
  );
  const arret = Velocite(0, 0, 0);
  return Lune(position, arret);
}
