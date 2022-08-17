export function getDifficultyConstants(difficulty) {

  switch (difficulty) {
    case 'easy':
      return ({
        'BOARD_SIZE': 350,
        'GRID_SIZE': 5,
        'NODE_COUNT': 25,
      })
    case 'medium':
      return ({
        'BOARD_SIZE': 350,
        'GRID_SIZE': 7,
        'NODE_COUNT': 49,
      })
    case 'hard':
      return ({
        'BOARD_SIZE': 351,
        'GRID_SIZE': 9,
        'NODE_COUNT': 81,
      })
  }
}