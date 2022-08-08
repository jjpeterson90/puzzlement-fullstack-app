import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'


function PuzzlesHome( {handleLogout} ) {


  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <h1 className="mb-5">
        Puzzle Challenge
      </h1>
      <div className="d-flex justify-content-around">
        <Link to={'/riddles'} className="text-decoration-none text-white">
          <Button variant="success">
          Riddles
          </Button>
        </Link>
        <Link to={'/imageslider'} className="text-decoration-none text-white">
          <Button variant="success">
            Image-Slider
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PuzzlesHome;