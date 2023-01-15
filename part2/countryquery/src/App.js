import { useState, useEffect } from "react";
import axios from "axios";
import Countries from './components/Countries.js'

const App = () => {
  const [query, setQuery] = useState("")
  const [countries, setCountries] = useState([])
  
  const hook = () => {
    axios.get(`https://restcountries.com/v3.1/all`).then(response =>{
      setCountries(response.data)
    })
  }

  useEffect(hook,[])

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery)
  }

  const showableCountries = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="App">
      find countries <input value={query} onChange={handleQueryChange}></input>
      <div>
        <Countries showableCountries={showableCountries} queryChange={handleQueryChange}/>
      </div>
    </div>
  );
}

export default App;
