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
      <Button variant="success">
        <Link to={'/riddles'} className="text-decoration-none text-white">
          Riddles
        </Link>
      </Button>
    </div>
  );
}

export default PuzzlesHome;