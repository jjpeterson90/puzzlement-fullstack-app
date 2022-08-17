import * as React from 'react';
import { useState, useRef } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'


function DifficultySelector( {difficulty, setDifficulty, imageURL, setImageURL, getNewImage } ) {

  const selected = useRef(difficulty)

  const handleChange = (event) => {
    try {
      let oldElement = document.getElementById('active-color') 
      oldElement.removeAttribute('id')
    } catch {
      console.log('no active difficulty selected')
    }

    let newElement = event.target
    newElement.setAttribute('id','active-color')
    selected.current = event.target.value

    setImageURL('')
    const imgID = imageURL.split('/')[4]
    setDifficulty(event.target.value)
    getNewImage(imgID)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={difficulty}
      id="button-group"
      exclusive
      onChange={(e) => handleChange(e)}
    >
      <ToggleButton className="difficulty-buttons" value="easy">Easy</ToggleButton>
      <ToggleButton className="difficulty-buttons" value="medium">Med</ToggleButton>
      <ToggleButton className="difficulty-buttons" value="hard">Hard</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default DifficultySelector