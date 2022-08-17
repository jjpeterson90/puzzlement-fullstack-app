import { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import { useTable } from 'react-table'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
// Backend API
import { Imgslider_Scores } from '../components/api/BackendAPI'

function Leaderboard() {

  const [ data, setData ] = useState([])

  const getData = async () => {
    const response = await Imgslider_Scores()
    const users = JSON.parse(response.data.users)
    const scores = JSON.parse(response.data.scores)
    const data_list = []
    users.map((user,i) => {
      scores.map((score,j) => {
        if (user.pk === score.fields.user_id) {
          data_list.push({
            username: user.fields.username,
            image: score.fields.ps_image_url,
            moves: score.fields.ps_moves,
            difficulty: score.fields.ps_difficulty,
          })
        }
      })
    })
    setData(data_list)
    console.log(data_list)
  }

  useEffect( () => {
    getData()
  }, [])

  const popover = (image) => {
    return (
      <Popover id="popover-basic">
        <Popover.Body>
          <img src={image}/>
        </Popover.Body>
      </Popover>
    )
  }

  const untangleScores = (
    <>
    { data ?
      data.map((user) => {
        return (
          <Row className="d-flex justify-content-between my-1">
            <Col className="text-center">
              <p>{user.username}</p>
            </Col>
            <Col className="text-center">
              <p>{user.difficulty}</p>
            </Col>
            <Col className="text-center">
              <p>{user.moves}</p>
            </Col>
            <Col xs={4} className="text-center">
              <OverlayTrigger trigger="click" placement="left" overlay={popover(user.image)}>
                <Button variant="success">See Image</Button>
              </OverlayTrigger>
            </Col>
          </Row>
        )
      }) : null
    }
    </>
  )

  return(
    <Container>
      <Tabs
        defaultActiveKey="untangle"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="knottyquestions" title="Knotty Questions">
          <p>
            empty
          </p>
        </Tab>
        <Tab eventKey="untangle" title="Untangle">
          <Row className="d-flex justify-content-between mb-3">
            <Col className="text-center">
              <p className="text-decoration-underline">Username</p>
            </Col>
            <Col className="text-center">
              <p className="text-decoration-underline">Difficulty</p>
            </Col>
            <Col className="text-center">
              <p className="text-decoration-underline">Moves</p>
            </Col>
            <Col xs={4} className="text-center">
              <p className="text-decoration-underline">Image</p>
            </Col>
          </Row>
          {untangleScores}
        </Tab>
        <Tab eventKey="unveil" title="Unveil">
          <p>
            empty
          </p>
        </Tab>
      </Tabs>

      {/* <Button variant="primary" onClick={getData}>
        Get Data
      </Button> */}
    </Container>
  )
}

export default Leaderboard