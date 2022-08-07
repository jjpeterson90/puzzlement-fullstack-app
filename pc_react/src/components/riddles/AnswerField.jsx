

function AnswerField( {lettersGuessed, setLettersGuessed, letterChoices} ) {

  function unselectLetter(event) {
    if (event.target.textContent !== '_') {
      let newLettersGuessed = JSON.parse(JSON.stringify(lettersGuessed))
      const index = event.target.dataset.index
      newLettersGuessed[index][0] = ''
      newLettersGuessed[index][1] = ''
      setLettersGuessed(newLettersGuessed)
    }
  }

  return (
    <div className="d-flex">
      { lettersGuessed &&
        lettersGuessed.map((elem, index) => {
          return (
            <div className="ans-tile" id={`ans${index}`} data-index={index} onClick={(e) => unselectLetter(e)}>
              { elem[1] ? elem[1] : '_' }
            </div>
          )
        })
      }
    </div>
  )
}

export default AnswerField