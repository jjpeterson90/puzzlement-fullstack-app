import { Motion, spring } from 'react-motion'
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from './constants'
import { getGridPosition, getActualPosition, getBackgroundPosition } from './helperfunctions'

function Tile(props) {

  const { index, tile, width, height, imageURL, handleTileClick } = props

  const { row, col } = getGridPosition(index, GRID_SIZE)
  const actualPosition = getActualPosition(row, col, width, height)

  const motionStyle = {
    translateX: spring(actualPosition.x),
    translateY: spring(actualPosition.y),
  }
  const tileStyle = {
    height: `calc(100% / ${GRID_SIZE})`,
    width: `calc(100% / ${GRID_SIZE})`,
    translateX: actualPosition.x,
    translateY: actualPosition.y,
    backgroundImage: `url(${imageURL})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${getBackgroundPosition(tile, GRID_SIZE)}`,
  }

  return (
    <Motion style={motionStyle}>
     {
       ( {translateX, translateY} ) => (
         <li
          style = {{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            //last tile?
            opacity: tile ? 1 : 0,
          }}
          className="tile"
          onClick={ () => {handleTileClick(index)} }
         >
           {
             !imageURL &&
             `${tile + 1}`
           }
         </li>
       )
     }
    </Motion>
  )
}

export default Tile