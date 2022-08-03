import Button from "react-bootstrap/Button"

function LetterTiles( {letterChoices, selectLetter} ) {

  const half = letterChoices.length / 2
  const row1 = letterChoices.slice(0,half)
  const row2 = letterChoices.slice(half)

  return (
    <section className="mt-5">
      <div className="container p-0">
        <div className="d-flex justify-content-center">
          { row1.map((letter, index) => {
              return (
                <Button className="bg-success tile m-1 p-0" id={`ltr${index}`} value={letter} onClick={(e) => {selectLetter(e)}}>
                  {letter}
                </Button>
              )
            })
          }
        </div>
        <div className="d-flex justify-content-center">
          { row2.map((letter, index) => {
              return (
                <Button className="bg-success tile m-1 p-0" id={`ltr${index+7}`} value={letter} onClick={(e) => {selectLetter(e)}}>
                  {letter}
                </Button>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default LetterTiles