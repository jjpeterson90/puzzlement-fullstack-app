import { useEffect } from 'react'
import { IoMdShuffle, IoMdRefresh } from 'react-icons/io'

function RiddleOptions( {letterChoices, setLetterChoices, lettersGuessed, shuffleArray, resetLettersGuessed} ) {

  const shuffleLetterChoiceTiles = () => {
    let newChoices = shuffleArray(letterChoices)
    setLetterChoices(newChoices)
  }

  return (
    <>
      <IoMdShuffle className="riddle-icon" onClick={shuffleLetterChoiceTiles}/>
      <IoMdRefresh className="riddle-icon" onClick={() => resetLettersGuessed()}/>
    </>
  )
}

export default RiddleOptions