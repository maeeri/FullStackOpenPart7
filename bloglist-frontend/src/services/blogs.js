import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  return token
}

const setConfig = (newToken) => {
  token = setToken(newToken)
  const config = {
    headers: { Authorization: token },
  }
  return config
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newBlog, newToken) => {
  const config = setConfig(newToken)

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = async (id, newToken) => {
  const config = setConfig(newToken)

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async (blog, newToken) => {
  const config = setConfig(newToken)
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

export default { getAll, create, update, remove, setToken, getOne }
