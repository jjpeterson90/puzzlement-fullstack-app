import { useState, useEffect } from 'react';
import axios from 'axios';
// Components
import SliderBoard from '../components/imageslider/SliderBoard';


function ImageSliderPage() {

  const [imageURL, setImageURL] = useState('')

  useEffect( () => {
    imageAPI()
  }, [])

  async function imageAPI() {
    const url = await axios.get('https://picsum.photos/240').then(response => {
      setImageURL(response.request.responseURL)
    })
  }

  return (
    <div className="container p-0">
      <h1>
        Image Slider
      </h1>
      <div className="d-flex justify-content-center">
        <SliderBoard imageURL={imageURL}/>
      </div>
    </div>
  )
}

export default ImageSliderPage