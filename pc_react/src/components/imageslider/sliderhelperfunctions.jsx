
export function isSolvable(tiles) {
  let inversions = 0
  for (let i = 0; i <= tiles.length - 1; i++) {
    for (let j = i + 1; j <= tiles.length; j++) {
      if (tiles[j] && tiles[i] && (tiles[j] < tiles[i])) {
        inversions++
      }
    }
  }
  console.log('inversions: ', inversions)
  let grid_size = Math.sqrt(tiles.length)
  let emptyIndex = tiles.indexOf(0)
  let emptyRow = Math.floor(emptyIndex / grid_size);
  if (inversions == 0) {
    return true
  } else if (grid_size % 2 == 1 && inversions % 2 == 0) {
    return true
  } else if (grid_size % 2 == 0 && emptyRow % 2 == 0 && inversions % 2 == 1) {
    return true
  } else if (grid_size % 2 == 0 && emptyRow % 2 == 1 && inversions % 2 == 0) {
    return true
  } else {
    return false
  }
}

export function isSolved(tiles) {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] !== i) {
      return false
    }
  }
  return true
}

export function shuffle(tiles) {
  let newTiles = [...tiles]
  let currentIndex = newTiles.length
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newTiles[currentIndex], newTiles[randomIndex]] = [newTiles[randomIndex], newTiles[currentIndex]];
  }
  return isSolvable(newTiles) && !isSolved(newTiles) ?
    newTiles : shuffle(newTiles)
}

export function canSlide(srcIndex, destIndex, grid_size) {
  const src = getGridPosition(srcIndex, grid_size)
  const dest = getGridPosition(destIndex, grid_size)
  const isAdjacent = Math.abs(src.row - dest.row) + Math.abs(src.col - dest.col) === 1
  return isAdjacent
}

export function swapTiles(src, dest, tiles) {
  let newTiles = [...tiles]
  const temp = newTiles[src]
  newTiles[src] = newTiles[dest]
  newTiles[dest] = temp
  return newTiles
}

export function getBackgroundPosition(tile, grid_size) {
  const interval = 100 / (grid_size -1)
  const left = interval * (tile % grid_size)
  const top = interval * (Math.floor(tile / grid_size))
  return `${left}% ${top}%`
}

export function getGridPosition(index, grid_size) {
  return {
    row: Math.floor(index / grid_size),
    col: index % grid_size,
  }
}

export function getActualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  }
}