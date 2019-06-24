import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, event}) => <button onClick={event}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
    const count = good + neutral + bad
    const average = (good - bad) / count || 0
    const positive = 100 * good / count || 0

    return (
        <div>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>

            <div>all {count}</div>
            <div>average {average}</div>
            <div>positive {positive} %</div>
        </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increase = (variable, setter) => () => setter( variable + 1 )


  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" event={increase(good, setGood)} />
      <Button text="neutral" event={increase(neutral, setNeutral)} />
      <Button text="bad" event={increase(bad, setBad)} />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
