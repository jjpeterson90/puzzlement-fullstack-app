import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function LoginRegister() {

  const navigate = useNavigate()

  const handleLoginForm = async (event) => {
    console.log('login function')
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value
    // path = '/signup' or '/login' depending on button pressed
    let eventType = event.nativeEvent.submitter.value

    const response = await axios.post(eventType, {
      username:username,
      password:password,
    }).catch((resp) => {
      console.log('login error: ', resp)
    })

    console.log('login response: ', response)

    if (response.data['success']) {
      console.log('login success: ', response.data)
      navigate('/')
      window.location.reload()
    }
  }

  const buttonStyle = {
    height: 60,
    backgroundColor: ''
  }

  return (
    <Container className="login-screen">
      <div className="home-title text-center">
        <h1>
          Puzzlement
        </h1>
      </div>
      <div className="text-center">
        <p className="lead my-5">Please log in or register</p>        
      </div>
      <div className="text-center d-flex flex-column align-items-center">
        <Form onSubmit={handleLoginForm}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter Username" className="text-center" />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" className="text-center" />
          </Form.Group>
          <Row className="mt-5" style={buttonStyle}>
            <Button className="login-button" type="submit" value="/login">
              Login
            </Button>            
          </Row>
          <Row className="mt-3" style={buttonStyle}>
            <Button className="login-button" type="submit" value="/signup">
              Register
            </Button>            
          </Row>
        </Form>
      </div>
    </Container>
  )
}

export default LoginRegister