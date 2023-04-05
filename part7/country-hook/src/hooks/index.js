import { useState, useEffect } from "react"
import { getCountry } from "../services"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
        setValue(event.target.value)
    }
  
    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
        const getData = async () => {
            setCountry(null);
            const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            if(response.data[0].area){
                response.data[0].found = true
            }
            console.log(response.data[0])
            if(!ignore){
                setCountry(response.data[0])
            }
            
        }
        let ignore = false
        getData()
        return () => {
            ignore = true
        }
    }, [name])
    
    return country
}