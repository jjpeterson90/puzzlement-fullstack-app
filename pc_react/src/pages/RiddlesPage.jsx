import { useState, useEffect } from 'react'
// components
import DisplayQuestion from '../components/riddles/DisplayQuestion'
import AnswerField from '../components/riddles/AnswerField'
import LetterTiles from '../components/riddles/LetterTiles'
// data
import riddlelist from '../data/riddlelist.json'
// bootstrap icons
import { ImShuffle } from 'react-icons/im'


function Riddles() {

  const [ riddles, setRiddles ] = useState(riddlelist)
  const [ count, setCount ] = useState(0)
  const [ lettersGuessed, setLettersGuessed ] = useState(getLettersGuessed())
  const [ letterChoices, setLetterChoices ] = useState(getLetterChoices())

  useEffect( () => {
    checkForWin()
  }, [lettersGuessed])

  function getLetterChoices() {
      let list = riddles[count].answer.toUpperCase().split('')
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      while (list.length < 14) {
        list.push(alphabet.charAt(Math.floor(Math.random()*alphabet.length)))
      }
      // return list
      return shuffleArray(list)
  }

  function getLettersGuessed() {
    let list = riddles[count].answer.toUpperCase().replace(/[A-Z]/g,'_').split('')
    let newList = list.map( (elem) => { return [elem, undefined] })
    return newList
  }

  function shuffleArray(array) {
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

  function checkForWin() {
    const solution = riddles[count].answer.toUpperCase()
    const user_answer = lettersGuessed.map((elem) => {
      if (elem[0].match(/[A-Z]/)) return elem[0]
    }).join('')
    const answerTiles = document.querySelectorAll('.ans-tile')

    // Set answer tiles font color based on solution status
    answerTiles.forEach(element => {
      if (user_answer.length === solution.length) {
        if (solution === user_answer) {
          element.style.color = 'rgb(0,220,0)'
          // redirect to win screen
        } else {
          element.style.color = 'rgb(255,130,0)'
        }
      } else {
        if (element.style.color = 'rgb(255,255,255)') return
        else element.style.color = 'rgb(255,255,255)'
      }
    })
  }

  const shuffleChoiceTiles = () => {
    console.log('shuffling')
    let newChoices = shuffleArray(letterChoices)
    setLetterChoices([...newChoices])
  }

  function saveUserData() {
    
  }

  return (
    <div className="container p-0">
      <div className="text-center">
        <h1>
          Riddles
        </h1>
      </div>
      <div className="pt-5 d-flex justify-content-center">
        <DisplayQuestion question={riddles[count].question}/>
      </div>
      <div className="pt-5 d-flex justify-content-center">
        <AnswerField lettersGuessed={lettersGuessed} unselectLetter={unselectLetter}/>
      </div>
      <div className="pt-5 d-flex flex-column align-items-center">
        <ImShuffle id="shuffle-icon" onClick={shuffleChoiceTiles}/>
        <LetterTiles letterChoices={letterChoices} selectLetter={selectLetter} />        
      </div>
      <div className="pt-3 d-flex justify-content-center">
        <button className="btn btn-info" onClick={saveUserData()}>
          Press
        </button>
      </div>
    </div>
  )
}

export default Riddles


