import Button from "react-bootstrap/Button";

function PuzzleWin( {answer, count, setCount} ) {

  function nextRiddle() {
    const next = count+1
    setCount(next)
  }

  return (
    <div className="text-center text-warning">
      <h1 className="text-decoration-underline">
        Correct!
      </h1>
      <hr className=" my-0 w-50 mx-auto"/>
      <h3 className="my-5">
        The correct answer is
      </h3>
      <h2 className="mb-5">
        {answer}
      </h2>
      <Button onClick={() => nextRiddle()} id="riddle-win-button">
        Continue
      </Button>
    </div>
  )
}

export default PuzzleWin