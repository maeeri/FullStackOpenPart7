import { Nav, Navbar, Button } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Navigation = ({ btnStyle }) => {
  const padding = {
    padding: 5,
    color: 'black',
    margin: '0.5%',
    color: 'darkcyan',
    textDecoration: 'none',
  }
  const navbar = {
    color: 'black',
    padding: 5,
    position: 'top',
    }


  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const logout = () => {
    dispatch(setUser({}))
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <Navbar bg="light" sticky="top" expand="xl">
      {user.id !== undefined && (
        <div style={navbar}>
          {user.name} is now logged in
          <Button style={btnStyle} id="logout" onClick={logout}>
            log out
          </Button>
        </div>
      )}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link style={padding} to="">
            home
          </Link>
          <Link style={padding} to="blogs">
            blogs
          </Link>
          <Link style={padding} to="users">
            users
          </Link>
        </Nav>
      </Navbar.Collapse>

      <Outlet />
    </Navbar>
  )
}

export default Navigation
