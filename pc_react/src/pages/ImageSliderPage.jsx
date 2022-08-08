import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './ImageSlider.css'
import Button from 'react-bootstrap/Button'
// Components
import SliderBoard from '../components/imageslider/SliderBoard'
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from '../components/imageslider/constants'
// API
import { ImageAPI } from '../components/api/ImageAPI'


function ImageSliderPage() {

  const [imageURL, setImageURL] = useState('')

  useEffect( () => {
    getNewImage()
  }, [])

  async function getNewImage() {
    const url = await ImageAPI(BOARD_SIZE)
    console.log('have url: ', url)
    setImageURL(await url)
  }

  const handleNewGameClick = () => {
    getNewImage()
  }

  console.log('url status: ', imageURL)

  return (
    <div className="App">
      <Link to={'/'} className="text-decoration-none text-white">
        <Button variant="primary">
          Home
        </Button>
      </Link>
      <h1>
        Image Slider
      </h1>
      <SliderBoard imageURL={imageURL} handleNewGameClick={handleNewGameClick}/>
    </div>
  )
}

export default ImageSliderPage