import Button from "react-bootstrap/Button"

function LetterTiles( {lettersGuessed, setLettersGuessed, letterChoices, setLetterChoices} ) {

  const half = letterChoices.length / 2
  const row1 = letterChoices.slice(0,half)
  const row2 = letterChoices.slice(half)

  function selectLetter(event) {
    for (let i = 0; i < lettersGuessed.length; i++) {
      if (!lettersGuessed[i]) {
        let newLettersGuessed = [...lettersGuessed]
        let newLetterChoices = [...letterChoices]
        const ltrTile = document.getElementById(event.target.id)
        const ansTile = document.getElementById(`ans${i}`)
        ltrTile.style.visibility = 'hidden'
        ansTile.dataset.id = event.target.id
        newLettersGuessed[i] = event.target.value
        newLetterChoices[event.target.dataset.id] = ''
        setLettersGuessed(newLettersGuessed)
        setLetterChoices(newLetterChoices)
        return
      }
    }
  }
  
  return (
      <div className="d-flex flex-wrap justify-content-center" id="letter-choices-container">
        { letterChoices.map((letter, index) => {
            return (
              <Button 
                id={`ltr${index}`}
                data-id={index}
                value={letter}
                onClick={(e) => selectLetter(e)}
                style={{ visibility: letter ? 'visible' : 'hidden'}}
              >
                {letter}
              </Button>
            )
          })
        }
      </div>
  )
}

export default LetterTiles