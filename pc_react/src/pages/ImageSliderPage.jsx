import './css/ImageSlider.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
// Components
import SliderBoard from '../components/imageslider/SliderBoard'
import { getDifficultyConstants } from '../components/imageslider/constants'
import DifficultySelector from '../components/shared/DifficultySelector';
// API
import { ImageAPI } from '../components/api/ImageAPI'


function ImageSliderPage() {

  const [ imageURL, setImageURL ] = useState('')
  const [ difficulty, setDifficulty ] = useState('medium')
  
  const { BOARD_SIZE, GRID_SIZE, TILE_COUNT } = getDifficultyConstants(difficulty)

  async function getNewImage(imgID=null) {
    setImageURL('')
    const url = await ImageAPI(BOARD_SIZE, imgID)
    setImageURL(await url)
  }

  const boardContainerStyle = {
    height: 400,
  }

  return (
    <Container className="p-0">
      <div id="title-box">
        <div className="text-center">
          <h1>
            Untangle
          </h1>
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
      <div style={boardContainerStyle}>
        <SliderBoard 
          imageURL={imageURL}
          setImageURL={setImageURL}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          getNewImage={getNewImage}
        />
      </div>
    </Container>
  )
}

export default ImageSliderPage