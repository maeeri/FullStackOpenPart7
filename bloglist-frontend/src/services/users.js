import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const remove = async (id, token) => {
  const config = setConfig(token)

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async (user, token) => {
  const config = setConfig(token)

  const response = await axios.put(`${baseUrl}/${user.id}`, user, config)
  return response.data
}

export default { getAll, getOne, create, remove, update }
