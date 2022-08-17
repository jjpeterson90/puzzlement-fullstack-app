import './css/AccountPage.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import FairyImage from '../images/pngaaa.com-217782.png'
import { Link } from 'react-router-dom'
// Bootstrap
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form'
// Components
import ResetSaveData from '../components/account/ResetSaveData'
import DeleteAccount from '../components/account/DeleteAccount'


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
              <h4>{idea.activity}!</h4>
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

  return (
    <Container>
      <Row className="align-items-center title-box">
        <div className="text-center mx-auto">
          <h2>
            Account
          </h2>
        </div>
      </Row>
      <hr className="my-0"/>
      <div className="d-flex justify-content-evenly align-items-center account-options-box">
        <div id="reset-save-data">
          <ResetSaveData />
        </div>
        {/* <div id="delete-account">
          <DeleteAccount handleLogout={handleLogout}/>
        </div> */}
      </div>
      <hr className="my-0" />
      <Row className="text-center align-items-center guide-box">
        <h4 className="mt-2">
          Looking for a new activity?
        </h4>
        <p className="w-75 mx-auto my-3">
          Choose an option from the menu below and ask the Idea Fairy for advice!
        </p>
        <div className="d-flex justify-content-center">
          <Form.Select className="dropdown-box" onChange={handleSelectorChange} name="selector">
            { 
              CATEGORY.map((val, i) => {
                return <option value={CATEGORY[i]}> {LABEL[i]} </option>
              })
            }
          </Form.Select>
        </div>
      </Row>
      <Row className="align-items-center idea-text-box">
        <div className="text-center d-flex align-items-center justify-content-center">
          {displayIdea()}
        </div>
      </Row>
      <div className="idea-btn-box">
        <Button className="fairy-button" onClick={getIdea}>
          Ask Idea Fairy
        </Button>
      </div> 
      <Row className="logout-btn-box" id="logout-row">
        <Button className="logout-button" as={Link} to={{ pathname: '/' }} onClick={handleLogout}>
          Logout
        </Button>
      </Row>
    </Container>
  )

}

export default AccountPage