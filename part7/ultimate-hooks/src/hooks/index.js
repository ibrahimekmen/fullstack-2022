import { useState } from "react"
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    
    const create = async(resource) => {
        const response = await axios.post(baseUrl, resource)
        const data = response.data
        setResources(resources.concat(data))
        return data
    }

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        const data = response.data
        setResources(data)
        return data
      }
      
  
    const service = {
      create,
      getAll
    }
  
    return [
      resources, service
    ]
}