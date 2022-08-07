import Button from "react-bootstrap/Button";

function PuzzleWin( {answer, count, setCount} ) {

  function nextRiddle() {
    const next = count+1
    setCount(next)
  }

  return (
    <div className="text-center text-warning">
      <h2>Congratulations!</h2>
      <h3>The correct answer is</h3>
      <h3>{answer}</h3>
      <Button onClick={() => nextRiddle()}>
        Continue
      </Button>
    </div>
  )
}

export default PuzzleWin