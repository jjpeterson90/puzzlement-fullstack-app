import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Accordion from 'react-bootstrap/Accordion';
// import { IoSettingsSharp } from 'react-icons/io'
import { VscAccount } from 'react-icons/vsc'
import { BsQuestionCircle } from 'react-icons/bs'


function MyNavbar( {user, handleLogout} ) {

  const navigate = useNavigate()
  const ref = useRef(null)

  const hideOrShow = user ? { visibility: 'visible'} : { visibility: 'hidden' }

  const handleInternalLogout = () => {
    navigate('/')
    handleLogout()
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Puzzlement F.A.Q.</Popover.Header>
      <Popover.Body>
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Why do I have to log in?</Accordion.Header>
            <Accordion.Body>
              Puzzlement saves users' progress in order to populate the leaderboard content. Each user must be logged in with a unique username in order to do this effectively.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How do I play Knotty Questions?</Accordion.Header>
            <Accordion.Body>
              Knotty Questions is a riddle-solving game with over 400 riddles, each with one-word answers. Users must use the 14 letters at the bottom of the screen to populate the correct answer.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do I play Untangle?</Accordion.Header>
            <Accordion.Body>
              Untangle begins by showing the user a competed image. Pressing the Start Game button will scramble the image and users must rearrange the tiles to form the completed picture. Tiles can be moved by clicking tiles adjacent to the empty tile space.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>How do I play Unveil?</Accordion.Header>
            <Accordion.Body>
              Unveil begins with an image hidden behind a smoke screen. Clicking a given tile will toggle the visibility of it AND adjacent tiles. The goal is to completely uncover the image by eliminating the smokescreen.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Is every puzzle solvable?</Accordion.Header>
            <Accordion.Body>
              Yes. All of the puzzles are made to be solvable. Users will not run into a condition where a puzzle is impossible to solve.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Popover.Body>
    </Popover>
  );

  function getTarget(event) {
    const target = document.getElementById('isNavbar')
    return target
  }

  const actIconStyle = {
    height: 23,
    width: 23,
    marginLeft: 8,
  }
  const helpIconStyle = {
    height: 23,
    width: 23,
  }

  return (
    <Navbar className="navbar-custom" ref={ref} id="isNavbar"  style={hideOrShow}>
      <Container id="nav-container">
        <Nav>
          <Nav.Item className="d-flex align-items-center">
            <OverlayTrigger trigger="click" placement="bottom-start" overlay={popover} container={ref} containerPadding={20} rootClose={true}>
              <button id="help-button">
                <BsQuestionCircle style={helpIconStyle} />
              </button>
            </OverlayTrigger>
          </Nav.Item>
          <NavDropdown title="MENU" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to='/'>Home</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/riddles">Knotty Questions</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/imageslider">Untangle</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/lightsout">Unveil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/leaderboard">Leaderboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleInternalLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Navbar.Brand id="brand" as={Link} to="/">
          Puzzlement
        </Navbar.Brand>
        <Nav>
          {user}
          <Nav.Item as={Link} to='/account'>
            <VscAccount style={actIconStyle} />
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MyNavbar