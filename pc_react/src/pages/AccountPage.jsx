import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import FairyImage from '../images/pngaaa.com-217782.png'
import { Link } from 'react-router-dom'
// Bootstrap
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form'


function AccountPage( {handleLogout} ) {

  const CATEGORY = ['random', 'education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']
  const LABEL = ['Random', 'Educational', 'Recreational', 'Social', 'DIY Project', 'Charity', 'Cooking', 'Relaxing', 'Musical', 'Busy-work']

  const [ idea, setIdea ] = useState('')
  const selected = useRef('')

  useEffect( () => {
    const choice = document.getElementsByName('selector')[0].value
    selected.current = choice
  }, [])

  const getIdea = async () => {
    const response = await axios.post('/activityAPI', {
      choice: selected.current,
    }).catch((resp) => {
      console.log('idea API error: ', resp)
    })
    console.log(response.data['message'])
    if (response.data['success']) {
      setIdea(response.data['message'])
    } else {
      setIdea('')
    }
  }

  const displayIdea = () => {
    return (
      <>
        { idea.activity ? 
            <div>
              <h4>{idea.activity}</h4>
            </div>    
          : null
        }
        <img src={FairyImage} id="fairy-image" />      
      </>
    )
  }

  const handleSelectorChange = () => {
    selected.current = event.target.value
  }

  const titleStyle = {
    height: 100,
  }
  const guideStyle = {
    height: 200,
  }
  const dropdownStyle = {
    width: 200,
  }
  const ideaTextStyle = {
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, .1)'
  }
  const ideaBtnStyle = {
    height: 75,
  }
  const logoutBtnStyle = {
    height: 75,
  }

  return (
    <Container>
      <Row className="align-items-center" style={titleStyle}>
        <div className="text-center mx-auto">
          <h2>
            Account Settings
          </h2>
        </div>
      </Row>
      <hr className="my-0"/>
      <Row className="text-center align-items-center" style={guideStyle}>
        <h4 className="mt-2">
          Looking for a new activity?
        </h4>
        <p className="w-75 mx-auto my-3">
          Choose an option from the menu below and ask the Idea Fairy for advice!
        </p>
        <div className="d-flex justify-content-center">
          <Form.Select style={dropdownStyle} onChange={handleSelectorChange} name="selector">
            { 
              CATEGORY.map((val, i) => {
                return <option value={CATEGORY[i]}> {LABEL[i]} </option>
              })
            }
          </Form.Select>
        </div>
      </Row>
      <Row className="align-items-center" style={ideaTextStyle}>
        <div className="text-center d-flex align-items-center justify-content-center">
          {displayIdea()}
        </div>
      </Row>
      <Row style={ideaBtnStyle}>
        <Button className="fairy-button" onClick={getIdea}>
          Ask Idea Fairy
        </Button>
      </Row> 
      <Row style={logoutBtnStyle} id="logout-row">
        <Button className="logout-button" as={Link} to={{ pathname: '/' }} variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Row>
    </Container>
  )

}

export default AccountPage