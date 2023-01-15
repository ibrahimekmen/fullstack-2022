import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({country}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
        <p>{country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.keys(country.languages).map(langKey => <li key={langKey}>{country.languages[langKey]}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag of the country png"></img>
        <Weather capital={country.capital[0]}/>
    </div>
  )
}

const Weather = ({capital}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${capital}&units=metric`
  const [weatherReport, setWeatherReport] = useState([])
  const hook = () => {
    axios.get(url).then(response => {
      setWeatherReport(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  //eslint-disable-next-line
  useEffect(hook, [])

  return(
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weatherReport?.main?.temp} celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherReport?.weather?.[0]?.icon}@2x.png`} alt="weather icon"></img>
      <p>wind {weatherReport?.wind?.speed}m/s</p>
    </div>
  )
}


const Countries = ({showableCountries, queryChange}) => {
    if(showableCountries.length > 10){
      return(
        <div><p>Too many matches, specifty the filter further</p></div>
      )
    }else if(showableCountries.length > 1){
      return(  
        showableCountries.map((country) => 
          <p key={country.cca2}>{country.name.common} 
              <button type="button" value={country.name.common} key={country.cca3} onClick={queryChange}>show
              </button>
          </p>
        )
      )
    }else if(showableCountries.length === 1){
      const country = showableCountries[0]
      return(
        <Country country={country}/>
      )
    }else{
      return(
        <div>
          <p>There are no countries with this name</p>
        </div>
      )
    }
}

export default Countries