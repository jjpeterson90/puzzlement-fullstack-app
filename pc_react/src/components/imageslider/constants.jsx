export function getDifficultyConstants(difficulty) {

  switch (difficulty) {
    case 'easy':
      return ({
        'BOARD_SIZE': 351,
        'GRID_SIZE': 3,
        'TILE_COUNT': 9,
      })
    case 'medium':
      return ({
        'BOARD_SIZE': 352,
        'GRID_SIZE': 4,
        'TILE_COUNT': 16,
      })
    case 'hard':
      return ({
        'BOARD_SIZE': 350,
        'GRID_SIZE': 5,
        'TILE_COUNT': 25,
      })
  }
}