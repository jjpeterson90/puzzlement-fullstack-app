import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Puzzlement from '../images/Text&pieces.png'


export default function Home() {

  return (
    <>
      <div className="home-title d-flex justify-content-center align-items-center">
        <img src={Puzzlement} />
      </div>
      <div className="game-links text-center">
        <Link to={'/riddles'} className="text-decoration-none text-white">
          <Button variant="home">
            Knotty Questions
          </Button>
        </Link>
        <Link to={'/imageslider'} className="text-decoration-none text-white">
          <Button variant="home">
            Untangle
          </Button>
        </Link>
        <Link to={'/lightsout'} className="text-decoration-none text-white">
          <Button variant="home">
            Unveil
          </Button>
        </Link>
      </div>
    </>
  )
}

