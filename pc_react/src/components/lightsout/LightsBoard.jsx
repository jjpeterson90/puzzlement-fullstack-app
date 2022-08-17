import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
// Constants & Helpers
import { getDifficultyConstants } from './constants'
import { randomizeNodes, toggleAdjacent } from './lightshelperfunctions'
import { ImSpinner9 } from 'react-icons/im'
// Components
import Node from './Node'
import TilesWin from './TilesWin'

function LightsBoard( {difficulty, imageURL, getNewImage} ) {

  const { BOARD_SIZE, GRID_SIZE, NODE_COUNT } = getDifficultyConstants(difficulty)
  
  const [ nodes, setNodes ] = useState(Array(NODE_COUNT).fill(0))
  const [ count, setCount ] = useState(0)
  const [ win, setWin ] = useState(false)
  const isMounted = useRef(false)

  const BoardStyle = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundImage: `url(${imageURL})`,
  }

  useEffect( () => {
    load_game_data()
  }, [])

  useEffect( () => {
    checkWin()
    if (isMounted.current) {
      save_data({
        tile_flip_orientation: nodes,
        tile_flip_moves: count,
      })
    }
  }, [nodes])

  useEffect( () => {
    resetNodes()
    if (isMounted.current) {
      save_data({
        tile_flip_image: imageURL,
        tile_flip_difficulty: difficulty,
      })
    }
  }, [imageURL])

  async function save_data(data) {
    const response = await axios.post('/save', data).catch(resp => {
      console.log('save error: ', resp)
    })
    console.log('data saved')
  }
  
  async function load_game_data() {
    const response = await axios.get('/loadsave').catch(resp => {
      console.log('load error: ', resp)
    })
    console.log('loading')
    if (response.data['fail']) {
      getNewImage()
    } else {
      const game_data = response.data[0].fields
      if (game_data['tile_flip_image']) {
        loadGameData(game_data)
      } else {
        getNewImage()
      }
    }
  }

  function loadGameData(game_data) {
    console.log('loading game data')
    setDifficulty(game_data['tile_flip_difficulty'])
    setImageURL(game_data['tile_flip_image'])
    setNodes(game_data['tile_flip_orientation'])
    setCount(game_data['tile_flip_moves'])
    isMounted.current = true
  }

  function checkWin () {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] === 0) {
        return
      }
    }
    setWin(true)
  }

  const handleNodeClick = (index) => {
    setNodes(toggleAdjacent(index, GRID_SIZE, nodes))
    setCount(count+1)
  }
  
  const resetNodes = () => {
    setNodes(Array(NODE_COUNT).fill(0))
    setCount(0)
  }

  const handleNewGame = () => {
    setWin(false)
    getNewImage()
    resetNodes()
    setCount(0)
  }

  const handleReset = () => {
    resetNodes()
    setCount(0)
  }

  const devSolve = () => {
    setNodes(Array(NODE_COUNT).fill(1))
  }

  return (
    <>
      <div id="puzzle-box">
        { imageURL ?
            <ul className="board" style={{...BoardStyle}}>
              { nodes.map( (node, index) => (
                  <Node 
                    node={node}
                    index={index}
                    handleNodeClick={handleNodeClick}
                    difficulty={difficulty}
                  />
                ))
              }
            </ul>
          : 
            <ImSpinner9 id="loading-spinner"/>
        }
      </div>
      <div id="bottom-box">
        <div id="move-count">
          <h2 className="p-0 my-auto">
            {count}
          </h2>
        </div>
        <div id="game-controls">
          <Button
            className="game-control-button control-left"
            onClick={handleNewGame}
            disabled={imageURL ? false : true}
          >
            New Game
          </Button>
          <Button
            className="game-control-button control-right"
            onClick={handleReset}
            disabled={imageURL ? false : true}
          >
            Reset
          </Button>            
        </div>
      </div>
      { win ?
          <div className="game-win d-flex flex-column justify-content-center align-items-center">
            <TilesWin
              imageURL={imageURL}
              count={count}
              handleNewGame={handleNewGame}
            />
          </div>
        : null
      }
      <>
        <Button id="hidden-solver" onClick={devSolve}>
        </Button>
      </>
    </>
  )
}

export default LightsBoard