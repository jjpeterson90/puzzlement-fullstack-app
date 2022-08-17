import '../App.css'
import './css/Riddles.css'
import { useState, useEffect, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
// components
import AnswerField from '../components/riddles/AnswerField'
import RiddleOptions from '../components/riddles/RiddleOptions'
import LetterTiles from '../components/riddles/LetterTiles'
import PuzzleWin from '../components/riddles/PuzzleWin'
// data & helpers
import riddles from '../data/new_riddles.json'
import { 
  shuffleArray,
  rebuildNestedArrayFromString,
  makeNewLetterChoices,
 } from '../components/riddles/riddlehelperfunctions'
// APIs
import { Riddle_Score_Save } from '../components/api/BackendAPI'

function RiddlesPage() {

  let isMounted = useRef(false)

  const [ count, setCount ] = useState(0)
  const [ lettersGuessed, setLettersGuessed ] = useState(false)
  const [ letterChoices, setLetterChoices ] = useState(false)
  const [ win, setWin ] = useState(false)

  const RIDDLE = riddles.find(x => x.id === count)
  const QUESTION = RIDDLE.question
  const ANSWER = RIDDLE.answer.toUpperCase()
  

  useEffect( () => {
    load_game_data()
  }, [])
  
  useEffect( () => {
    if (lettersGuessed) {
      checkForWin()
    }
  }, [lettersGuessed])

  useEffect( () => {
    if (win === true && isMounted.current) {
      resetLettersGuessed()
      setLetterChoices(makeNewLetterChoices(ANSWER))
      setWin(false)
    }
  }, [count])

  useEffect( () => {
    if (letterChoices) {
      save_data()
    }
  }, [letterChoices])

  async function save_data() {
    const letterChoicesAsString = [].concat(...letterChoices).join('')
    const data = {
      riddle_number: count,
      riddle_letter_choices: letterChoicesAsString
    }
    const response = await axios.post('/save', data).catch(resp => {
      console.log('save error: ', resp)
    })
    console.log('data saved: ', response)
  }

  async function load_game_data() {
    const response = await axios.get('/loadsave').catch(resp => {
      console.log('riddle load error: ', response)
    })
    console.log('load response: ', response)
    isMounted.current = true
    if (response.data['fail']) {
      getInitialData()
    } else {
      const game_data = response.data[0].fields
      if (game_data['riddle_letter_choices']) {
        loadGameData(game_data)
      } else {
        getInitialData()
      }
    }
  }

  function loadGameData(game_data) {
    console.log('loading game data')
    const loadedLetterChoices = rebuildNestedArrayFromString(game_data['riddle_letter_choices'])
    setCount(game_data['riddle_number'])
    resetLettersGuessed(game_data['riddle_number'])
    setLetterChoices(loadedLetterChoices)
  }

  function getInitialData() {
    console.log('making new game')
    resetLettersGuessed()
    setLetterChoices(makeNewLetterChoices(ANSWER))
  }

  function resetLettersGuessed(num = count) {
    const freshArray = new Array(riddles.find(x => x.id === num).answer.length).fill(['',''])
    setLettersGuessed(freshArray)
  }

  function checkForWin() {
    const user_answer = lettersGuessed.map((elem) => {
      if (elem[1].match(/[A-Z]/)) return elem[1]
    }).join('')
    if (ANSWER === user_answer) {
      setTimeout( () => {
        setWin(true)
        const data = {
          riddle_number: count,
        }
        Riddle_Score_Save(data)
      }, 500)
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
    <Container className="p-0">
      { letterChoices ?
        <>
          <div className="d-flex justify-content-center align-items-center" id="title-box">
            <div className="text-center">
              <h2>
                Knotty Questions
              </h2>              
            </div>
          </div>
          <hr className="my-0"/>
          <div className="p-0 d-flex justify-content-center align-items-center" id="question-box">
            <div id="display-question">
              <h3>
                {QUESTION}
              </h3>
            </div>
          </div>
          <div className="p-0 d-flex" id="options-box">
            <RiddleOptions
              letterChoices={letterChoices}
              setLetterChoices={setLetterChoices}
              lettersGuessed={lettersGuessed}
              shuffleArray={shuffleArray}
              resetLettersGuessed={resetLettersGuessed}
            />
          </div>
          <div className="p-0 d-flex justify-content-center align-items-center" id="answer-box">
            <AnswerField 
              lettersGuessed={lettersGuessed}
              setLettersGuessed={setLettersGuessed}
              letterChoices={letterChoices}
            />
          </div>
          <div className="p-0 d-flex justify-content-center align-items-center" id="letters-box">
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
        <div className="game-win d-flex flex-column justify-content-center align-items-center">
          <PuzzleWin
            answer={ANSWER}
            count={count}
            setCount={setCount}
            setWin={setWin}
          />
        </div>
        :
        null
      }
    </Container>
  )
}

export default RiddlesPage


