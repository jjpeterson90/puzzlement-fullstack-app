

function AnswerField( {lettersGuessed, setLettersGuessed, letterChoices, setLetterChoices} ) {

  function unselectLetter(event) {
    if (event.target.textContent !== '_') {
      let newGuessedList = [...lettersGuessed]
      let newChoicesList = [...letterChoices]
      const ansTileId = event.target.id
      const ansIndex = event.target.dataset.index
      const ltrTile = document.getElementById(event.target.dataset.id)
      const ltrIndex = ltrTile.dataset.id
      newChoicesList[ltrIndex] = event.target.textContent
      newGuessedList[ansIndex] = ''
      ltrTile.style.visibility = 'visible'
      setLetterChoices(newChoicesList)
      setLettersGuessed(newGuessedList)
    }
  }

  return (
    <div className="d-flex">
      {
        lettersGuessed.map((elem, index) => {
          return (
            <div className="ans-tile" value={elem} id={`ans${index}`} data-index={index} onClick={(e) => unselectLetter(e)}>
              { elem ? elem : '_' }
            </div>
          )
        })
      }
    </div>
  )
}

export default AnswerField