import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import './css/Riddles.css'
// components
import AnswerField from '../components/riddles/AnswerField'
import RiddleOptions from '../components/riddles/RiddleOptions'
import LetterTiles from '../components/riddles/LetterTiles'
import PuzzleWin from '../components/riddles/PuzzleWin'
// data & helpers
import riddles from '../data/riddlelist.json'
import { 
  shuffleArray,
  rebuildNestedArrayFromString,
  makeNewLetterChoices,
 } from '../components/riddles/riddlehelperfunctions'


function RiddlesPage() {

  let firstRender = useRef(true)

  // const [ riddles, setRiddles ] = useState(riddlelist)
  const [ count, setCount ] = useState(0)
  const [ lettersGuessed, setLettersGuessed ] = useState(false)
  const [ letterChoices, setLetterChoices ] = useState(false)
  const [ win, setWin ] = useState(false)

  const ANSWER = riddles[count].answer.toUpperCase()

  useEffect( () => {
    load_game_data()
  }, [])
  
  useEffect( () => {
    if (lettersGuessed) {
      checkForWin()
    }
  }, [lettersGuessed])

  useEffect( () => {
    if (win === true) {
      if (!firstRender.current) {
        resetLettersGuessed()
        setLetterChoices(makeNewLetterChoices(ANSWER))
        setWin(false)
      }
    }
  }, [count])

  useEffect( () => {
    if (count != '' && letterChoices) {
      save_data()
    }
  }, [letterChoices])

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

  function load_game_data() {
    axios.get('/loadsave').then(response => {
      console.log(response)
      if (!response.data['fail']) {
        const loaded_data = response.data[0].fields
        let loadedLetterChoices = rebuildNestedArrayFromString(loaded_data['riddle_letter_choices'])
        setCount(loaded_data['riddle_number'])
        resetLettersGuessed(loaded_data['riddle_number'])
        setLetterChoices(loadedLetterChoices)
        firstRender.current = false
      } else {
        resetLettersGuessed()
        setLetterChoices(makeNewLetterChoices(ANSWER))
        firstRender.current = false
      }
    })
  }

  function resetLettersGuessed(num = count) {
    const freshArray = new Array(riddles[num].answer.length).fill(['',''])
    setLettersGuessed(freshArray)
  }

  function checkForWin() {
    const user_answer = lettersGuessed.map((elem) => {
      if (elem[1].match(/[A-Z]/)) return elem[1]
    }).join('')
    if (ANSWER === user_answer) {
      setTimeout( () => {
        setWin(true)
      }, 300)
    }
    setAnswerTileColor(user_answer)
  }

  function setAnswerTileColor(user_answer) {
    const answerTiles = document.querySelectorAll('.ans-tile')
    answerTiles.forEach(element => {
      if (user_answer.length === ANSWER.length) {
        if (ANSWER === user_answer) {
          element.style.color = 'rgb(0,220,0)'
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
            answer={ANSWER}
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


