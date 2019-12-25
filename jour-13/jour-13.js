export function compteLesBlocks(outputs) {
  let blocks = 0;
  for (let i = 0; i < outputs.length - 2; i += 3) {
    const tileId = outputs[i + 2];
    if (tileId === 2) blocks++;
  }
  return blocks;
}
