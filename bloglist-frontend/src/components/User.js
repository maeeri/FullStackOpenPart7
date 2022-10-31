import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = ({ bodyStyle }) => {
  const id = useParams().id
  const userList = useSelector((state) => state.userList)
  const user = userList.find((u) => u.id === id)
  if (!user) { return null }
  return (
    <div style={bodyStyle}>
      <h2>User profile</h2>
      <hr />
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
