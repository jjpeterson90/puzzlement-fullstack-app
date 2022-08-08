import { useState, useEffect } from 'react'
// Helpers
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from './constants'
import { shuffle, canSlide, swapTiles, isSolved } from './helperfunctions'
// Components
import Tile from './Tile'
// Bootstrap & Icons
import Button from 'react-bootstrap/Button';
import { IoMdShuffle, IoMdRefresh } from 'react-icons/io'
import { ImSpinner9 } from 'react-icons/im'

function SliderBoard( {imageURL, handleNewGameClick } ) {

  const [ tiles, setTiles ] = useState([...Array(TILE_COUNT).keys()])
  const [ started, setStarted ] = useState(false)

  const tileWidth = Math.round(BOARD_SIZE / GRID_SIZE)
  const tileHeight = Math.round(BOARD_SIZE / GRID_SIZE)
  const boardStyle = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  }

  const slideTile = (tileIndex) => {
    const src = tileIndex
    const dest = tiles.indexOf(0)
    if (canSlide(src, dest, GRID_SIZE)) {
      const slideResult = swapTiles(tileIndex, tiles.indexOf(0), tiles)
      setTiles(slideResult)
    }
  }

  const handleTileClick = (index) => {
    slideTile(index)
  }

  const shuffleTiles = () => {
    const newTiles = shuffle(tiles)
    setTiles(newTiles)
  }

  const handleStartClick = () => {
    shuffleTiles()
    setStarted(true)
  }

  const handleShuffleClick = () => {
    shuffleTiles()
  }

  const winner = isSolved(tiles)

  return (
    <>
      { winner && started ?
        <h2>Congratulations!</h2> : null}
      { started ?
        <IoMdShuffle className="shuffle-icon" onClick={() => handleShuffleClick()}/>
        : null }
      { imageURL ? 
          <ul className="board" style={boardStyle}>
            { tiles.map((tile, index) => (
              <Tile
                key={tile}
                index={index}
                tile={tile}
                width={tileWidth}
                height={tileHeight}
                imageURL={imageURL}
                handleTileClick={handleTileClick}
              />
            )) }
            { winner ?
              <div id="freeze-board"></div>
              : null }
          </ul>
          : <div className="d-flex justify-content-center align-items-center" style={boardStyle}>
              <ImSpinner9 id="loading-spinner"/>
            </div> }
      { !started && imageURL ?
        <Button onClick={() => handleStartClick()}>Start Game</Button>
        : null }
      { winner && started ?
        <Button onClick={handleNewGameClick}>New Game</Button>
        : null}
    </>
  )
}

export default SliderBoard