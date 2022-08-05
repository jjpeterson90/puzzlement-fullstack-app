import { useState, useEffect, useRef } from 'react'
// components
import AnswerField from '../components/riddles/AnswerField'
import RiddleOptions from '../components/riddles/RiddleOptions'
import LetterTiles from '../components/riddles/LetterTiles'
// data
import riddlelist from '../data/riddlelist.json'
// bootstrap icons
import { ImShuffle } from 'react-icons/im'
// axios
import axios from 'axios'


function Riddles() {

  let firstRender = useRef(true)

  const [ riddles, setRiddles ] = useState(riddlelist)
  const [ count, setCount ] = useState(0)
  const [ lettersGuessed, setLettersGuessed ] = useState(getLettersGuessed())
  const [ letterChoices, setLetterChoices ] = useState([])

  useEffect( () => {
    load_save_data()
  }, [])

  useEffect( () => {
    checkForWin()
  }, [lettersGuessed])

  useEffect( () => {
    if (!firstRender.current) {
      save_data()
    }
  }, [letterChoices])

  async function save_data() {
    const data = {
      riddle_number: count,
      riddle_letter_choices: letterChoices.join('')
    }
    await axios.post('/save', data).then(response => {
      console.log('data saved. response: ', response)
    })
  }

  async function load_save_data() {
    await axios.get('/loadsave').then(response => {
      if (!response.data['fail']) {
        const save_data = response.data[0].fields
        setCount(save_data['riddle_number'])
        setLetterChoices(save_data['riddle_letter_choices'].split(''))
      } else {
        getLetterChoices()
      }
    })
  }

  function getLetterChoices() {
    let list = riddles[count].answer.toUpperCase().split('')
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    while (list.length < 14) {
      list.push(alphabet.charAt(Math.floor(Math.random()*alphabet.length)))
    }
    // make object list
    const newList = shuffleArray(list)
    setLetterChoices(newList)
    firstRender.current = false
  }

  // const listObject = Object.assign({}, letterChoices)
  // console.log('listObject: ', listObject)



  function getLettersGuessed() {
    return new Array(riddles[count].answer.length).fill('')
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

  function checkForWin() {
    const solution = riddles[count].answer.toUpperCase()
    const user_answer = lettersGuessed.map((letter) => {
      if (letter.match(/[A-Z]/)) return letter
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

  return (
    <div className="container p-0">
      <div className="text-center">
        <h1>
          Riddles
        </h1>
      </div>
      <div className="pt-5 d-flex justify-content-center">
        <div id="display-question">
          {riddles[count].question}
        </div>
      </div>
      <div className="pt-5 d-flex justify-content-center">
        <AnswerField 
          lettersGuessed={lettersGuessed}
          setLettersGuessed={setLettersGuessed}
          letterChoices={letterChoices}
          setLetterChoices={setLetterChoices}
        />
      </div>
      <div className="py-4 d-flex justify-content-center">
        <RiddleOptions
          letterChoices={letterChoices}
          setLetterChoices={setLetterChoices}
          lettersGuessed={lettersGuessed}
          shuffleArray={shuffleArray}
        />
      </div>
      <div className="d-flex flex-column align-items-center">
        <LetterTiles 
          lettersGuessed={lettersGuessed} 
          setLettersGuessed={setLettersGuessed} 
          letterChoices={letterChoices}
          setLetterChoices={setLetterChoices}
        />        
      </div>
    </div>
  )
}

export default Riddles


