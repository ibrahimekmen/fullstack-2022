const Header = ({course}) => {
  return(
    <h2>{course}</h2>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map((part) => <Part part={part}/>)}
    </div>
  )
}

const Part = ({part}) => {
  return(
    <p>{part.name} {part.exercises}</p>
  );
}


const Total = ({parts}) => {
  return(
      <p><b> total of {parts.reduce((sum,part) => sum + part.exercises, 0)} exercises </b></p>
  );
}

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
    <div>
        <h1>Web development curriculum</h1>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    
  );
}

export default App