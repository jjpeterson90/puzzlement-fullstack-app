import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {getDifficultyConstants} from '../components/lightsout/constants'
import '../App.css'
import './css/LightsOut.css'
// Components
import LightsBoard from '../components/lightsout/LightsBoard'
import DifficultySelector from '../components/shared/DifficultySelector';
// API
import { ImageAPI } from '../components/api/ImageAPI'


function TileFlipPage() {

  const [ imageURL, setImageURL ] = useState('')
  const [ difficulty, setDifficulty ] = useState('medium')

  const { BOARD_SIZE, GRID_SIZE, TILE_COUNT } = getDifficultyConstants(difficulty)

  const boardContainerStyle = {
    height: getDifficultyConstants('hard').BOARD_SIZE,
  }
  
  async function getNewImage(imgID=null) {
    setImageURL('')
    const url = await ImageAPI(BOARD_SIZE, imgID)
    setImageURL(url)
  }

  return (
    <>
      <div id="title-box">
        <div className="text-center">
          <h1>Unveil</h1>
        </div>
      </div>
      <hr className="my-0"/>
      <div id="difficulty-box">
        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          imageURL={imageURL}
          setImageURL={setImageURL}
          getNewImage={getNewImage}
        />
      </div>
      <div className="App" style={{...boardContainerStyle}}>
        <LightsBoard 
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          imageURL={imageURL}
          setImageURL={setImageURL}
          getNewImage={getNewImage}
        />
      </div>
    </>
  )
}

export default TileFlipPage