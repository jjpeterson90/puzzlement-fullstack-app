import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { getDifficultyConstants } from './constants';
import { shuffle, canSlide, swapTiles, isSolved } from './sliderhelperfunctions'
// Components
import Tile from './Tile'
import SliderWin from './SliderWin'
// APIs
import { Imgslider_Score_Save } from '../api/BackendAPI'
// Bootstrap & Icons
import Button from 'react-bootstrap/Button';
import { IoMdShuffle, IoMdRefresh } from 'react-icons/io'
import { ImSpinner9 } from 'react-icons/im'
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';

function SliderBoard( {imageURL, setImageURL, difficulty, setDifficulty, getNewImage} ) {

  const { BOARD_SIZE, GRID_SIZE, TILE_COUNT } = getDifficultyConstants(difficulty)

  const [ tiles, setTiles ] = useState([...Array(TILE_COUNT).keys()])
  const [ started, setStarted ] = useState(false)
  const [ count, setCount ] = useState(0)
  const [ win, setWin ] = useState(false)
  const isMounted = useRef(false)
  const ref = useRef(null)

  const boardStyle = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  }

  useEffect( () => {
    load_game_data()
  }, [])

  useEffect( () => {
    if (imageURL && isMounted.current) {
      setTiles([...Array(TILE_COUNT).keys()])
      setStarted(false)
      save_data({
        image_slider_img: imageURL,
        image_slider_difficulty: difficulty,
      })
    }
  }, [imageURL])

  useEffect( () => {
    if (isMounted.current) {
      save_data({
        image_slider_orientation: tiles,
        image_slider_moves: count,
      })
    }
  }, [tiles])

  useEffect( () => {
    if (isMounted.current) {
      save_data({
        image_slider_started: started,
      })      
    }
  }, [started])

  async function save_data(data) {
      const response = await axios.post('/save', data).catch(resp => {
        console.log('save error: ', resp)
      })
      console.log('data saved')
  }

  async function load_game_data() {
    const response = await axios.get('/loadsave').catch(resp => {
      console.log('load error: ', resp)
    })
    console.log('load response: ', response.data)

    if (response.data['fail']) {
      getInitialData()
    } else {
      const game_data = response.data[0].fields
      if (game_data['image_slider_img']) {
        loadGameData(game_data)
      } else {
        getInitialData()
      }
    }
  }

  function loadGameData(game_data) {
    console.log('loading game data')
    setDifficulty(game_data['image_slider_difficulty'])
    setStarted(game_data['image_slider_started'])
    setTiles(JSON.parse(game_data['image_slider_orientation']))
    setCount(game_data['image_slider_moves'])
    setImageURL(game_data['image_slider_img'])
    setTimeout( () => {
      isMounted.current = true
    }, 500)
  }

  function getInitialData() {
    console.log('making new game')
    getNewImage()
    setTimeout( () => {
      isMounted.current = true
    }, 500)
  }

  const slideTile = (tileIndex) => {
    const src = tileIndex
    const dest = tiles.indexOf(0)
    if (canSlide(src, dest, GRID_SIZE)) {
      const slideResult = swapTiles(tileIndex, tiles.indexOf(0), tiles)
      setTiles(slideResult)
      setCount(count + 1)
    }
    if (isSolved(tiles)) {
      setWin(true)
      const data = {
        image_url: imageURL,
        moves: count,
        difficulty: difficulty,
      }
      Imgslider_Score_Save(data)
    }
  }

  const handleTileClick = (index) => {
    if (started) {
      slideTile(index)
    }
  }

  const shuffleTiles = () => {
    const newTiles = shuffle(tiles)
    console.log('shuffled: ', newTiles)
    setTiles(newTiles)
  }

  const handleStartClick = () => {
    shuffleTiles()
    setStarted(true)
  }

  const handleShuffleClick = () => {
    shuffleTiles()
    setCount(0)
  }

  const handleNewGameClick = () => {
    setWin(false)
    setTiles([...Array(TILE_COUNT).keys()])
    setStarted(false)
    setCount(0)
    getNewImage()
  }

  const handleResetClick = () => {
    setStarted(false)
    setTiles([...Array(TILE_COUNT).keys()])
    setCount(0)
  }
    
  const devSolve = () => {
    setTiles([...Array(TILE_COUNT).keys()])
  }

  return (
    <>
      <div id="puzzle-box">
        { imageURL
          ? 
          <ul className="board" style={boardStyle}>
            { tiles.map((tile, index) => (
              <Tile
                key={tile}
                index={index}
                tile={tile}
                imageURL={imageURL}
                difficulty={difficulty}
                handleTileClick={handleTileClick}
              />
            )) }
          </ul>
          : 
          <div className="d-flex justify-content-center align-items-center" style={boardStyle}>
            <ImSpinner9 id="loading-spinner"/>
          </div>
        }
      </div>
      <div id="bottom-box">
        <div id="move-count">
          <h2 className="p-0 my-auto">
            {count}
          </h2>
        </div>
        <div id = "shuffle-button">
          { started ?
              <IoMdShuffle className="slider-icon" onClick={handleShuffleClick} />
            : null
          }
        </div>
        <div id="game-controls">
          { !started ?
              <>
                <Button
                  className="game-control-button control-left"
                  
                  onClick={() => handleStartClick()}
                  disabled={imageURL ? false : true}
                >
                  Start Game
                </Button>
                <Button
                  className="game-control-button control-right"
                  onClick={handleNewGameClick}
                  disabled={imageURL ? false : true}
                >
                  New Image
                </Button>
              </>
            :
              <>
                <Button
                  className="game-control-button control-left"
                  onClick={handleResetClick}
                  disabled={imageURL ? false : true}
                >
                  Reset
                </Button>
                <Button
                  className="game-control-button control-right"
                  onClick={handleNewGameClick}
                  disabled={imageURL ? false : true}
                >
                  New Game
                </Button>
              </>
          }
        </div>
      </div>
      { win ?
          <div className="game-win d-flex flex-column justify-content-center align-items-center">
            <SliderWin
              imageURL={imageURL}
              count={count}
              handleNewGameClick={handleNewGameClick}
            />
          </div>
        : null
      }
      <>
        <Button id="hidden-solver" onClick={devSolve}>
        </Button>
      </>
    </>
  )
}

export default SliderBoard