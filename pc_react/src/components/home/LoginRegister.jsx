import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function LoginRegister( {handleLoginForm} ) {

  return (
    <section>
      <div className="text-center">
        <h1 className="mb-4">
          <b>Puzzle Challenge</b>
        </h1>
        <p className="lead mb-4">Login or Register</p>        
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

          <div className="d-flex justify-content-around">
            <Button variant="primary" type="submit" value="/login">
              Login
            </Button>
            <Button variant="primary" type="submit" value="/signup">
              Register
            </Button>
          </div>

        </Form>
      </div>
    </section>

  )
}

export default LoginRegister