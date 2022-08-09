import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import './css/ImageSlider.css'
// Components
import SliderBoard from '../components/imageslider/SliderBoard'
import { getDifficultyConstants } from '../components/imageslider/constants'
import DifficultySelector from '../components/imageslider/DifficultySelector';
// API
import { ImageAPI } from '../components/api/ImageAPI'
import axios from 'axios'


function ImageSliderPage() {

  const [ imageURL, setImageURL ] = useState('')
  const [ difficulty, setDifficulty ] = useState('medium')

  const { BOARD_SIZE, GRID_SIZE, TILE_COUNT } = getDifficultyConstants(difficulty)

  async function getNewImage(imgID=null) {
    setImageURL('')
    const url = await ImageAPI(BOARD_SIZE, imgID)
    setImageURL(await url)
  }

  const getBoardContainerStyle = {
    height: BOARD_SIZE,
    margin: '30px 20px 20px 30px',
  }

  return (
    <div className="App">
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        imageURL={imageURL}
        setImageURL={setImageURL}
        getNewImage={getNewImage}
      />
      <Link to={'/'} className="text-decoration-none text-white">
        <Button variant="primary">
          Home
        </Button>
      </Link>
      <h1>
        Image Slider
      </h1>
      <div className="App" style={getBoardContainerStyle}>
        <SliderBoard 
          imageURL={imageURL}
          setImageURL={setImageURL}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          getNewImage={getNewImage}
        />
      </div>
    </div>
  )
}

export default ImageSliderPage