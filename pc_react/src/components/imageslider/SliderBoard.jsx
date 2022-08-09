import { useState, useEffect } from 'react'
import axios from 'axios';
import { getDifficultyConstants } from './constants';
import { shuffle, canSlide, swapTiles, isSolved } from './sliderhelperfunctions'
// Components
import Tile from './Tile'
// Bootstrap & Icons
import Button from 'react-bootstrap/Button';
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { IoMdShuffle } from 'react-icons/io'
import { ImSpinner9 } from 'react-icons/im'

function SliderBoard( {imageURL, setImageURL, difficulty, setDifficulty, getNewImage} ) {

  const { BOARD_SIZE, GRID_SIZE, TILE_COUNT } = getDifficultyConstants(difficulty)

  const [ tiles, setTiles ] = useState([...Array(TILE_COUNT).keys()])
  const [ started, setStarted ] = useState(false)
  const [ initialLoad , setInitialLoad ] = useState(true)

  const tileWidth = Math.round(BOARD_SIZE / GRID_SIZE)
  const tileHeight = Math.round(BOARD_SIZE / GRID_SIZE)
  const boardStyle = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  }

  console.log('Loading? ', initialLoad)

  useEffect( () => {
    load_game_data()
  }, [])

  useEffect( () => {
    if (imageURL && !initialLoad) {
      setTiles([...Array(TILE_COUNT).keys()])
      setStarted(false)
      save_data({
        image_slider_img: imageURL,
        image_slider_difficulty: difficulty,
        //image_slider_moves: //moves
      })
    }
  }, [imageURL])

  useEffect( () => {
    if (!initialLoad) {
      save_data({
        image_slider_orientation: tiles,
      })
    }
  }, [tiles])

  useEffect( () => {
    if (!initialLoad) {
      save_data({
        image_slider_started: started,
      })      
    }
  }, [started])

  function save_data(data) {
    axios.post('/save', data).then(response => {
      console.log('data saved: ', response)
    })
  }

  function load_game_data() {
    axios.get('/loadsave').then(response => {
      if (!response.data['fail']) {
        const loaded_data = response.data[0].fields
        setDifficulty(loaded_data['image_slider_difficulty'])
        setStarted(loaded_data['image_slider_started'])
        setTiles(JSON.parse(loaded_data['image_slider_orientation']))
        setImageURL(loaded_data['image_slider_img'])
        setTimeout( () => {
          setInitialLoad(false)
        }, 500)
        
      } else {
        getNewImage()
        setTimeout( () => {
          setInitialLoad(false)
        }, 500)
      }
    })
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
    if (started) {
      slideTile(index)
    }
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

  const handleNewGameClick = () => {
    setTiles([...Array(TILE_COUNT).keys()])
    setStarted(false)
    getNewImage()
  }

  const handleResetClick = () => {
    setStarted(false)
    setTiles([...Array(TILE_COUNT).keys()])
  }

  // const handleDifficultyChange = (event) => {
  //   setImageURL('')
  //   const imgID = imageURL.split('/')[4]
  //   getNewImage(imgID)
  //   setDifficulty(event.target.value)
  //   setStarted(false)
  // }
    
  const devSolve = () => {
    setTiles([...Array(TILE_COUNT).keys()])
  }

  const winner = isSolved(tiles)

  // const buttonStyle = {
  //   width: "80px",
  //   height: "32px",
  //   padding: 0,
  // }

  return (
    <>
      {/* <div className="diff-options-container">
        <ToggleButtonGroup
          color="primary"
          value={difficulty}
          exclusive
          onChange={(e) => handleDifficultyChange(e)}
        >
          <ToggleButton style={{...buttonStyle}} value="easy">Easy</ToggleButton>
          <ToggleButton style={{...buttonStyle}} value="medium">Medium</ToggleButton>
          <ToggleButton style={{...buttonStyle}} value="hard">Hard</ToggleButton>
        </ToggleButtonGroup>      
      </div> */}
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
                difficulty={difficulty}
                handleTileClick={handleTileClick}
              />
            )) }
            { winner ?
              <div id="freeze-board"></div>
              : null }
          </ul>
          : <div className="d-flex justify-content-center align-items-center" style={boardStyle}>
              <ImSpinner9 id="initialLoad-spinner"/>
            </div> }
      { !started && imageURL ?
        <>
          <Button onClick={() => handleStartClick()}>Start Game</Button>
        </>
        : null }

      { started && imageURL ?
        <div>
          <Button onClick={handleNewGameClick}>New Game</Button>
          <Button onClick={handleResetClick}>Reset</Button>
        </div>
        : 
        <Button 
          onClick={handleNewGameClick}
          disabled={imageURL ? false : true}
        >New Image</Button> }
      <Button variant="success" onClick={devSolve}>
        DEV-SOLVE
      </Button>
    </>
  )
}

export default SliderBoard