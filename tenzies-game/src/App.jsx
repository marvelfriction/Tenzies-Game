import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  // checks if all die value are the same and isHeld, to announce win.
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  // generates new die property
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  // Houses and returns all new generated dice in array
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice;
  }
  console.log(allNewDice())

  // creates random die when not held, and creates new dice when game resets.
  function rollDice() {
    if(!tenzies) {
      setDice((prevDice) => prevDice.map((die) => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  // holds a die when toggled and vice versa
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  const diceElement = dice.map(die =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      // id={die.id}
      holdDice={() => holdDice(die.id)}
    />
  )

  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze
      it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button
        className="roll-dice"
        onClick={rollDice}>
        {tenzies ? "New game" : "Roll"}
      </button>
    </main>
  );
}