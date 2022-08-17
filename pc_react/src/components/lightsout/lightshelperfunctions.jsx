
export function randomizeNodes(NODE_COUNT) {
  return Array(NODE_COUNT).fill(0).map((n) => { return n = Math.round(Math.random()) })
}

export function getActualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  }
}

export function toggleAdjacent(index, GRID_SIZE, nodes) {
  const nodeMatrix = Array(GRID_SIZE).fill().map((v,i) => nodes.slice(GRID_SIZE * i, (GRID_SIZE * i) + GRID_SIZE))
  const row = Math.floor(index / GRID_SIZE)
  const col = Math.floor(index % GRID_SIZE)
  nodeMatrix[row][col] = Math.abs(nodeMatrix[row][col]-1) // SELF
  if (row-1 >= 0) nodeMatrix[row-1][col] = Math.abs(nodeMatrix[row-1][col]-1) // TOP
  if (row+1 < GRID_SIZE) nodeMatrix[row+1][col] = Math.abs(nodeMatrix[row+1][col]-1) // BOTTOM
  if (col-1 >= 0) nodeMatrix[row][col-1] = Math.abs(nodeMatrix[row][col-1]-1) // LEFT
  if (col+1 < GRID_SIZE) nodeMatrix[row][col+1] = Math.abs(nodeMatrix[row][col+1]-1) // RIGHT
  return(nodeMatrix.flat())
}