import { useState, useEffect } from 'react'
// Components
import { Tile } from './Tile'

function SliderBoard( {imageURL} ) {

  const [ tiles, setTiles ] = useState([...Array(9).keys()])

  document.addEventListener('keydown', (e) => {
    console.log(e)
  })

  const tileWidth = 80
  const tileHeight = 80

  return (
    <>
    board
    </>
  )
}

export default SliderBoard