export function getDifficultyConstants(difficulty) {

  switch (difficulty) {
    case 'easy':
      return ({
        'BOARD_SIZE': 240,
        'GRID_SIZE': 3,
        'TILE_COUNT': 9,
      })
    case 'medium':
      return ({
        'BOARD_SIZE': 320,
        'GRID_SIZE': 4,
        'TILE_COUNT': 16,
      })
    case 'hard':
      return ({
        'BOARD_SIZE': 400,
        'GRID_SIZE': 5,
        'TILE_COUNT': 25,
      })
  }
}