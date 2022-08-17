import { getDifficultyConstants } from './constants'

function Node( {node, index, handleNodeClick, difficulty } ) {

  const { BOARD_SIZE, GRID_SIZE, NODE_COUNT } = getDifficultyConstants(difficulty)

  const nodeBoxStyle = {
    height: `calc(100% / ${GRID_SIZE})`,
    width: `calc(100% / ${GRID_SIZE})`,
    backgroundColor: `${node ? 'transparent' : '#76829A' }`
  }

  return (
      <div
        className="node"
        style={nodeBoxStyle}
        onClick={() => handleNodeClick(index)}
      />
  )
}

export default Node