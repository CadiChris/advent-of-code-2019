export function Lune(position, velocite) {
  return {
    position,
    velocite
  };
}

export function Position(x, y, z) {
  return {
    x,
    y,
    z
  };
}

export function Velocite(x, y, z) {
  return { x, y, z };
}

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
