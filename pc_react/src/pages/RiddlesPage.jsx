import { useState, useEffect } from 'react'
// components
import DisplayQuestion from '../components/riddles/DisplayQuestion'
import AnswerField from '../components/riddles/AnswerField'
import LetterTiles from '../components/riddles/LetterTiles'
// data
import riddlelist from '../data/riddlelist.json'


function Riddles() {

  const [ riddles, setRiddles ] = useState(riddlelist)
  const [ count, setCount ] = useState(0)
  const [ lettersGuessed, setLettersGuessed ] = useState(getLettersGuessed())
  const [ letterChoices, setLetterChoices ] = useState(getLetterChoices())

  function getLetterChoices() {
      let list = riddles[count].answer.toUpperCase().split('')
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      while (list.length < 14) {
        list.push(alphabet.charAt(Math.floor(Math.random()*alphabet.length)))
      }
      return shuffle(list)
  }

  function getLettersGuessed() {
    let list = riddles[count].answer.toUpperCase().replace(/[A-Z]/g,'_').split('')
    let newList = list.map( (elem) => { return [elem, undefined] })
    return newList
  }

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function selectLetter(event) {
    for (let i = 0; i < lettersGuessed.length; i++) {
      if (lettersGuessed[i][1] === undefined) {
        let thisTile = document.getElementById(event.target.id)
        thisTile.style.visibility = 'hidden'
        let list = [...lettersGuessed]
        list[i] = [event.target.value, event.target.id]
        setLettersGuessed(list)
        return
      }
    }
  }

  function unselectLetter(event) {
    if (event.target.textContent !== '_') {
      let ansIndex = event.target.getAttribute('index')
      let ltrTile = document.getElementById(event.target.getAttribute('ltrId'))
      let newList = [...lettersGuessed]
      newList[ansIndex] = ['_', undefined]
      setLettersGuessed(newList)
      ltrTile.style.visibility = 'visible'
    }
  }

  return (
    <section className="d-flex flex-column align-items-center">
      <h1 className="mb-5">
        Riddles
      </h1>
      <DisplayQuestion question={riddles[count].question}/>
      <AnswerField lettersGuessed={lettersGuessed} unselectLetter={unselectLetter}/>
      <LetterTiles letterChoices={letterChoices} selectLetter={selectLetter} />
    </section>
  )
}

export default Riddles


