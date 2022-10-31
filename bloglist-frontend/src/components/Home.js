import { useSelector } from 'react-redux'

const Home = ({ bodyStyle }) => {
  const user = useSelector((state) => state.user)

  const homeStyle = {
    background: 'grey',
    height: '100%',
    color: 'white',
    paddingTop: 40,
    paddingBottom: 40,
    textAlign: 'center',
    fontSize: '3em',
    border: '5px dotted white',
    fontFamily: 'Shadows Into Light',
    textShadow: '1px 1px 2px black',
    }

    return (
        <div style={bodyStyle}>
        <div style={homeStyle}>Welcome, {user.name}</div>
            <div style={bodyStyle}>
                Welcome to your friendly blog app
            </div>
        </div>
    )
}

export default Home
