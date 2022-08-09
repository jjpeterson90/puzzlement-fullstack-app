import * as React from 'react';
import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'


function DifficultySelector( {difficulty, setDifficulty, imageURL, setImageURL, getNewImage } ) {

  const handleChange = (event) => {
      setImageURL('')
      const imgID = imageURL.split('/')[4]
      setDifficulty(event.target.value)
      getNewImage(imgID)
    }

  const buttonStyle = {
    width: "80px",
    height: "32px",
    padding: 0,
  }

  return (
    <div className="diff-options-container">
      <ToggleButtonGroup
        color="primary"
        value={difficulty}
        exclusive
        onChange={(e) => handleChange(e)}
      >
        <ToggleButton style={{...buttonStyle}} value="easy">Easy</ToggleButton>
        <ToggleButton style={{...buttonStyle}} value="medium">Medium</ToggleButton>
        <ToggleButton style={{...buttonStyle}} value="hard">Hard</ToggleButton>
      </ToggleButtonGroup>      
    </div>
  )
}

export default DifficultySelector