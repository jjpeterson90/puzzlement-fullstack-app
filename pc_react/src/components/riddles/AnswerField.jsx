

function AnswerField( {lettersGuessed, unselectLetter } ) {

  function getId(index) {
    if (lettersGuessed[index] !== undefined) {
      return `${lettersGuessed[index][1]}`
    } else {
      return ''
    }
  }

  return (
    <div className="d-flex">
      {
        lettersGuessed.map((elem, index) => {
          return (
            <div className="ans-tile" ltrId={getId(index)} index={index} onClick={(e) => unselectLetter(e)}>
              { elem[0] }
            </div>
          )
        })
      }
    </div>
  )
}

export default AnswerField