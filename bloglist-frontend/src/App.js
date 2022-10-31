import { useEffect } from 'react'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import Navigation from './components/Navigation'
import Home from './components/Home'

import { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'

import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/userListReducer'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const App = () => {
  const bodyStyle = {
    marginTop: 30,
    padding: 5,
    fontFamily: 'Arial',
  }

  const btnStyle = {
    backgroundColor: '#2596be',
    padding: 3,
    margin: 5,
    marginLeft: 15,
  }

  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(newUser))
      blogService.setToken(newUser.token)
    } else if (user.id !== undefined) {
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    }
  }, [])

  return (
    <Container>
      <Navigation btnStyle={btnStyle} />
      <div>
        <Notification message={notification} />
      </div>
      <div className="">{user.id === undefined && <Login btnStyle={btnStyle} />}</div>
      {user.id !== undefined && (
        <Routes>
          <Route index element={<Home bodyStyle={bodyStyle} />} />
          <Route
            path="blogs"
            element={<BlogList btnStyle={btnStyle} bodyStyle={bodyStyle} />}
          />
          <Route
            path="blogs/:id"
            element={<Blog btnStyle={btnStyle} bodyStyle={bodyStyle} />}
          />
          <Route
            path="users"
            element={<UserList btnStyle={btnStyle} bodyStyle={bodyStyle} />}
          />
          <Route
            path="users/:id"
            element={<User btnStyle={btnStyle} bodyStyle={bodyStyle} />}
          />
        </Routes>
      )}
    </Container>
  )
}

export default App
