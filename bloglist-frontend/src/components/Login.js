import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Button, Form, Row, Col } from 'react-bootstrap'

const Login = ({ bodyStyle, btnStyle }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    await dispatch(login(username, password)).then((res) => console.log(res))
    setPassword('')
    setUsername('')
  }

  return (
    <Row style={bodyStyle}>
      <Col xs md={6} lg={3}>
        <h1>Log in</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>

            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>password</Form.Label>

            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
          </Form.Group>

          <Button style={btnStyle} id="login-btn" type="submit">
            login
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
