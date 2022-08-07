import { useEffect } from 'react'
import { IoMdShuffle, IoMdRefresh } from 'react-icons/io'

function RiddleOptions( {letterChoices, setLetterChoices, lettersGuessed, shuffleArray, resetLettersGuessed} ) {

  const shuffleLetterChoiceTiles = () => {
    console.log('shuffling')
    let newChoices = shuffleArray(letterChoices)
    console.log('new choices: ', newChoices)
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