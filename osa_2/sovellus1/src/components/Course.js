import React from 'react'


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

export default Course