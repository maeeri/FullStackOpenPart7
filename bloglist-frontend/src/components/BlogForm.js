import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(newBlog, user.token))
    
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <table>
        <tbody>
          <tr>
            <td>title</td>
            <td>
              <input
                id="titleInput"
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => {
                  setTitle(target.value)
                }}
              />
            </td>
          </tr>
          <tr>
            <td>author</td>
            <td>
              <input
                id="authorInput"
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => {
                  setAuthor(target.value)
                }}
              />
            </td>
          </tr>
          <tr>
            <td>url</td>
            <td>
              <input
                id="urlInput"
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => {
                  setUrl(target.value)
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button id="create-blog" type="submit">
          create
        </button>
      </div>
    </form>
  )
}

export default BlogForm
