import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const all = axios.get(baseUrl)
    return all.then(response => response.data)
}

const addNewPerson = (newPerson) => {
    const response = axios.post(baseUrl, newPerson)
    return response.then(response => response.data)
}

const deletePerson = (id, personToBeDeleted) => {
    const response = axios.delete(`${baseUrl}/${id}`, personToBeDeleted)
    return response.then(response => response.data)
}

const updateNumber = (personToBeUpdated) => {
    const response = axios.put(`${baseUrl}/${personToBeUpdated.id}`, personToBeUpdated)
    return response.then(response => response.data)
}


const exportFunctions = {
    getAll, addNewPerson, deletePerson, updateNumber
}

export default exportFunctions