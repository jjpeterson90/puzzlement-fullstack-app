import { useState, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import './css/Riddles.css'
// components
import AnswerField from '../components/riddles/AnswerField'
import RiddleOptions from '../components/riddles/RiddleOptions'
import LetterTiles from '../components/riddles/LetterTiles'
import PuzzleWin from '../components/riddles/PuzzleWin'
// data
import riddles from '../data/riddlelist.json'


function RiddlesPage() {

  let firstRender = useRef(true)

  // const [ riddles, setRiddles ] = useState(riddlelist)
  const [ count, setCount ] = useState(0)
  const [ lettersGuessed, setLettersGuessed ] = useState(false)
  const [ letterChoices, setLetterChoices ] = useState(false)
  const [ win, setWin ] = useState(false)

  useEffect( () => {
    load_save_data()
  }, [])
  
  useEffect( () => {
    if (!firstRender.current) {
      checkForWin()
    }
  }, [lettersGuessed])

  useEffect( () => {
    if (!firstRender.current){
      save_data()
    }
  }, [letterChoices])

  useEffect( () => {
    if (win === true) {
      if (!firstRender.current) {
        resetLettersGuessed()
        makeNewLetterChoices()
        setWin(false)
      }
    }
  }, [count])

  function save_data() {
    const letterChoicesAsString = [].concat(...letterChoices).join('')
    const data = {
      riddle_number: count,
      riddle_letter_choices: letterChoicesAsString
    }
    axios.post('/save', data).then(response => {
      console.log('data saved: ', response)
    })
  }

  function load_save_data() {
    axios.get('/loadsave').then(response => {
      if (!response.data['fail']) {
        const save_data = response.data[0].fields
        let savedLetterChoices = rebuildNestedArrayFromString(save_data['riddle_letter_choices'])
        setCount(save_data['riddle_number'])
        resetLettersGuessed(save_data['riddle_number'])
        setLetterChoices(savedLetterChoices)
        firstRender.current = false
      } else {
        resetLettersGuessed()
        makeNewLetterChoices()
        firstRender.current = false
      }
    })
  }

  function rebuildNestedArrayFromString(str) {
    let index = 0
    let arr = []
    for (let i = 0; i < str.length; i++) {
      if (str[i].match(/\d/)) {
        if (arr[index]) arr[index][0] += str[i]
        else arr[index] = [str[i]]
      } else {
        arr[index][1] = str[i]
        index += 1
      }
    }
    return arr
  }

  function makeNewLetterChoices() {
    let list = riddles[count].answer.toUpperCase().split('')
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    while (list.length < 14) {
      list.push(alphabet.charAt(Math.floor(Math.random()*alphabet.length)))
    }
    const listWithLetterIDs = list.map((letter, index) => {
      return [index.toString(), letter]
    })
    const newList = shuffleArray(listWithLetterIDs)
    setLetterChoices(newList)
    firstRender.current = false
  }

  function resetLettersGuessed(num = count) {
    const freshArray = new Array(riddles[num].answer.length).fill(['',''])
    setLettersGuessed(freshArray)
  }

  function shuffleArray(array) {
    let newArray = JSON.parse(JSON.stringify(array))
    let currentIndex = newArray.length
    let randomIndex
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
  }

  function checkForWin() {
    const solution = riddles[count].answer.toUpperCase()
    const user_answer = lettersGuessed.map((elem) => {
      if (elem[1].match(/[A-Z]/)) return elem[1]
    }).join('')
    const answerTiles = document.querySelectorAll('.ans-tile')

    // Set answer tiles font color based on solution status
    answerTiles.forEach(element => {
      if (user_answer.length === solution.length) {
        if (solution === user_answer) {
          element.style.color = 'rgb(0,220,0)'
          setTimeout( () => {
            setWin(true)
          }, 300)
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
    <div className="container p-0 position-relative">
      <Link to={'/'} className="text-decoration-none text-white">
        <Button variant="primary">
          Home
        </Button>
      </Link>
      { letterChoices ?
        <>
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
            />
          </div>
          <div className="py-4 d-flex justify-content-center">
            <RiddleOptions
              letterChoices={letterChoices}
              setLetterChoices={setLetterChoices}
              lettersGuessed={lettersGuessed}
              shuffleArray={shuffleArray}
              resetLettersGuessed={resetLettersGuessed}
            />
          </div>
          <div className="d-flex flex-column align-items-center">
            <LetterTiles 
              lettersGuessed={lettersGuessed} 
              setLettersGuessed={setLettersGuessed} 
              letterChoices={letterChoices}
            />
          </div>
        </>
        : null
      }
      { win ?
        <div className="riddle-win d-flex flex-column justify-content-center align-items-center">
          <PuzzleWin
            answer={riddles[count].answer}
            count={count}
            setCount={setCount}
          />
        </div>
        :
        null
      }
    </div>
  )
}

export default RiddlesPage


