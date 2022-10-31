import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = ({ bodyStyle }) => {
  const user = useSelector((state) => state.user)

  const linkStyle = {
    color: 'darkcyan',
    textDecoration: 'none',
  }

  const users = useSelector((state) => state.userList)
  const userblogs = users.map((user) => user.blogs)
  console.log(userblogs)

  return (
    <div style={bodyStyle}>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link style={linkStyle} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
