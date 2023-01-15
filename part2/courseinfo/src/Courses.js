const Courses = ({courses}) => {
    return(
        <div>
            {courses.map((course) => <Course course={course}/>)}
        </div>
    );
}

const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  );
}


const Header = ({name}) => {
  return(
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map((part) => <Part part={part}/>)}
      <Total parts={parts}/>
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

export default Courses