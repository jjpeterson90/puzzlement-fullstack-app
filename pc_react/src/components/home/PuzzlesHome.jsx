import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'


function PuzzlesHome( {handleLogout} ) {


  return (
    <div className="text-center justify-content-center">
      <Button variant="primary" onClick={handleLogout}>
        Logout
      </Button>
      <h1 className="mb-5">
        Puzzle Challenge
      </h1>
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
  );
}
//d-flex flex-column h-100 justify-content-around align-items-center


export default PuzzlesHome;