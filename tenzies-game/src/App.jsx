import { useState } from 'react'
import './App.css'
import Die from './components/Die'

export default function App() {
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice;
  }
  console.log(allNewDice())

  function rollDice() {
    setDice(allNewDice())
  }

  const diceElement = dice.map( die => <Die value={die} />)

  return (
    <main className="App">
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}