import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>{props.course}</h1>    
)

const Part = (props) => (
    <p>
        {props.name} {props.exercises}
    </p>
)

const Content = (props) => (
    <div>
        {props.parts.map((part, i) => <Part name={part.name} exercises={part.exercises} key={i} />)}
    </div>
)

const Total = (props) => (
    <p>Number of exercises {props.parts.map(p => p.exercises).reduce((a,b)=>a+b)}</p>
)

const Course = (props) => (
    <> 
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </>
)

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
            name: 'Fundamentals of React',
            exercises: 10
            },
            {
            name: 'Using props to pass data',
            exercises: 7
            },
            {
            name: 'State of a component',
            exercises: 14
            }
        ]
    }
  
    return (
      <Course course={course} />
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
  