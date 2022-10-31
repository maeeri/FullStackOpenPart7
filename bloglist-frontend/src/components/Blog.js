import { useSelector, useDispatch } from 'react-redux'
import {
  deleteBlog,
  likeBlog,
  addComment,
  removeComments,
  initializeBlogs,
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ bodyStyle, btnStyle }) => {
  const listStyle = {
    listStyle: 'none',
    padding: 10,
  }

  const listItemStyle = {
    padding: 10,
    border: '1px solid black',
    margin: 2,
    backgroundColor: 'white',
  }

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)
  console.log(blog)
  let comments
  const defaultComment = ['no comments yet. want to leave one?']

  if (blog) {
    comments =
      blog.comments.length > 0
        ? blog.comments.map((c) => Object.values(c))
        : defaultComment
  }

  console.log(comments)

  const hideWhenDifferentUser = () => {
    return {
      backgroundColor: '#2596be',
      padding: 3,
      marginTop: 13,
      marginBottom: 13,
      display: user.id === blog.user.id ? '' : 'none',
    }
  }

  const boxStyle = {
    backgroundColor: 'white',
    boxShadow: '1px 1px 2px grey',
    padding: 15,
    width: 'fit-content',
  }

  const like = (id) => {
    dispatch(likeBlog(id, user.token))
  }

  const removeBlog = (blog) => {
    const choice = window.confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}?`
    )
    if (choice) {
      dispatch(deleteBlog(blog.id, user.token))
      dispatch(setNotification(`${blog.title} deleted`, 5))
    }
  }

  const handleCommentChange = (event) => {
    event.preventDefault()
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment, user.token))
    setComment('')
    document.getElementsByName('comment').forEach((x) => (x.value = ''))
  }

  const clearComments = () => {
    dispatch(removeComments(blog.id, user.token))
  }

  if (!user || !blog) {
    return null
  }

  return (
    <div style={bodyStyle}>
      <h2>Blog details</h2>
      <hr />
      <div style={boxStyle}>
        <h3>{blog.title}</h3>
        <br />
        <div>
          <div>by {blog.author}</div>
          <div>{blog.url}</div>
        </div>
        <div id="likes">
          {blog.likes} likes
          <Button
            style={btnStyle}
            className="like"
            onClick={() => like(blog.id)}
          >
            like
          </Button>
        </div>
        <div>added by {blog.user.name}</div>
        <Button
          className="delete"
          style={hideWhenDifferentUser()}
          onClick={() => removeBlog(blog)}
        >
          delete
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          placeholder="add a comment"
          onChange={handleCommentChange}
        />
        <Button style={btnStyle} type="submit">
          comment
        </Button>
      </form>

      <div>
        <ul style={listStyle}>
          {comments.length > 0 && (
            <div>
              {comments.map((c) => (
                <li key={c[1]} style={listItemStyle}>
                  {c[0]}
                </li>
              ))}
            </div>
          )}
          {comments == defaultComment && (
            <div>
              <li style={listItemStyle}>{comments}</li>
            </div>
          )}
        </ul>
      </div>
      {/* <Button onClick={() => clearComments()} style={btnStyle}>
        clear comments
      </Button> */}
    </div>
  )
}

export default Blog
