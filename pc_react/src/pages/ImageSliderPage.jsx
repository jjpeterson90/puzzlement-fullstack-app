import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './ImageSlider.css'
import Button from 'react-bootstrap/Button'
// Components
import SliderBoard from '../components/imageslider/SliderBoard'
import { getDifficultyConstants } from '../components/imageslider/constants'
import DifficultySelector from '../components/imageslider/DifficultySelector';
// API
import { ImageAPI } from '../components/api/ImageAPI'
import { flexbox } from '@mui/system';


function ImageSliderPage() {

  const [ imageURL, setImageURL ] = useState('')
  const [ difficulty, setDifficulty ] = useState('easy')

  const { BOARD_SIZE, GRID_SIZE, TILE_COUNT } = getDifficultyConstants(difficulty)

  useEffect( () => {
    getNewImage()
  }, [])

  async function getNewImage(imgID=null) {
    setImageURL('')
    const url = await ImageAPI(BOARD_SIZE, imgID)
    setImageURL(await url)
  }

  const handleNewGameClick = () => {
    getNewImage()
  }

  const getBoardContainerStyle = {
    height: BOARD_SIZE,
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
          handleNewGameClick={handleNewGameClick}
          difficulty={difficulty}
        />
      </div>
    </div>
  )
}

export default ImageSliderPage