import Button from "react-bootstrap/Button";

function SliderWin( {imageURL, count, handleNewGameClick} ) {

  return (
    <div className="text-center text-warning">
      <h1 className="text-decoration-underline">
        Congratulations!
      </h1>
      <hr className=" my-0 w-50 mx-auto"/>
      <h3 className="mt-3 mb-5">
        You won in {count} moves
      </h3>
      <img src={imageURL} className="mb-5" />
      <Button onClick={handleNewGameClick} id="slider-win-button">
        Continue
      </Button>
    </div>
  )
}

export default SliderWin