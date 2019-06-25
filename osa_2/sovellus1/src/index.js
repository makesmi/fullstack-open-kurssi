import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h2>{props.course}</h2>    
)

const Part = (props) => (
    <p>
        {props.name} {props.exercises}
    </p>
)

const Content = (props) => (
    <div>
        {props.parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)}
    </div>
)


const Total = ({parts}) => {
    const sum = parts.map(p => p.exercises).reduce((a,b)=>a+b)
    return <p><b>Total of {sum} exercises</b></p>
}

const Course = (props) => (
    <> 
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </>
)

const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
  
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => <Course course={course} key={'course_' + course.name} />)}
        </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
  