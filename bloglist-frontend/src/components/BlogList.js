import Togglable from './Togglable'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import { createBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsToShow = [...blogs].sort((a, b) => b.likes - a.likes)
  const togglableRef = useRef()

  const linkStyle = {
    color: 'darkcyan',
    textDecoration: 'none',
  }

  const bodyStyle = {
    marginTop: 30,
    padding: 5,
  }

  return (
    <div style={bodyStyle}>
      <h2>blogs</h2>
      <Table striped>
        <tbody>
          {blogsToShow.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link style={linkStyle} to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.user.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Togglable buttonLabel="add a blog" ref={togglableRef}>
        <h2>create new</h2>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    </div>
  )
}

export default BlogList
