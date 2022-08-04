import Button from "react-bootstrap/Button"

function LetterTiles( {letterChoices, selectLetter} ) {

  const half = letterChoices.length / 2
  const row1 = letterChoices.slice(0,half)
  const row2 = letterChoices.slice(half)

  return (
    <div>
      <div className="d-flex justify-content-center">
        { row1.map((letter, index) => {
            return (
              <Button id={`ltr${index}`} value={letter} onClick={(e) => {selectLetter(e)}}>
                {letter}
              </Button>
            )
          })
        }
      </div>
      <div className="d-flex justify-content-center">
        { row2.map((letter, index) => {
            return (
              <Button id={`ltr${index+7}`} value={letter} onClick={(e) => {selectLetter(e)}}>
                {letter}
              </Button>
            )
          })
        }
      </div>
    </div>
  )
}

export default LetterTiles