import { useEffect } from 'react'
import { ImShuffle } from 'react-icons/im'

function RiddleOptions( {letterChoices, setLetterChoices, lettersGuessed, shuffleArray} ) {

  useEffect( () => {

  }, [lettersGuessed])

  const shuffleChoiceTiles = () => {
    console.log('shuffling')
    let newChoices = shuffleArray(letterChoices)
    setLetterChoices([...newChoices])
  }

  return (
    <ImShuffle id="shuffle-icon" onClick={shuffleChoiceTiles}/>
  )
}

export default RiddleOptions