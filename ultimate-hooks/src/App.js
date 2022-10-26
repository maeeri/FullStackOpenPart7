import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  console.log(baseUrl)

  const getAll = () => {
    axios.get(baseUrl)
      .then(res => setResources(res.data))
  }

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(res => res.data)
  }

  const update = (id, resource) => {
    axios.put(`${baseUrl}/${id}`, resource)
      .then(res => res.data)
  }

  const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`)
      .then(res => res)
  }

  const service = {
    getAll,
    create,
    update,
    remove
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  const [submit, setSubmit] = useState(true)

  useEffect(() => {
    noteService.getAll()
    personService.getAll()
  }, [submit])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    setSubmit(!submit)
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    setSubmit(!submit)
  }

  const removeNote = (id) => {
    noteService.remove(id)
    setSubmit(!submit)
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content} <button onClick={() => removeNote(n.id)}>delete</button></p> )}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App