import './App.css'
import { useState, useEffect, useRef } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'
// Pages
import Home from './pages/Home'
import RiddlesPage from './pages/RiddlesPage'
import ImageSliderPage from './pages/ImageSliderPage'
import LightsOutPage from './pages/LightsOutPage'
import AccountPage from './pages/AccountPage'
import Leaderboard from './pages/Leaderboard'
// Components
import MyNavbar from './components/home/MyNavbar'
import LoginRegister from './components/authentication/LoginRegister'
// CSRF
import getCSRFToken from './components/authentication/getCSRFToken'
axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()

console.log('CSRF: ', axios.defaults.headers.common)

function App() {

  const isMounted = useRef(false)
  const [ user, setUser ] = useState()
  
  const handleLogout = () => {
    axios.post('/logout').then((response) => {
      console.log('logout response: ', response)
      whoAmI()
    })
  }

  async function whoAmI () {
    const response = await axios.get('/whoami').catch((resp) => {
      console.log('whoami error: ', resp)
    })
    if (response.data['user']) {
      const data = JSON.parse(response.data['user'])
      const username = data[0].fields['username']
      console.log('whoami: ', username)
      setUser(username)
    } else {
      console.log('whoami: undefined')
      setUser(null)
    }
    isMounted.current = true
  }

  function getRoute() {
    console.log(`mounted? ${isMounted.current}, user? ${user}`)
    if (isMounted.current) {
      if (user) {
        return <Home />
      } else {
        return <LoginRegister />
      }
    }
  }

  useEffect( () => {
    whoAmI()
  }, [])
  
  return (
    <Container className="Inner-App">
      <Router>
        <MyNavbar user={user} handleLogout={handleLogout} />
        <Container id="App-Body">
          <Routes>
            <Route exact path='/' element={ getRoute() } />
            <Route path='/riddles' element={ <RiddlesPage /> } />
            <Route path='/imageslider' element={ <ImageSliderPage user={user} /> } />
            <Route path='/lightsout' element={ <LightsOutPage user={user} /> } />
            <Route path='/account' element={ <AccountPage handleLogout={handleLogout} /> } />
            <Route path='/leaderboard' element={ <Leaderboard /> } />
          </Routes>
        </Container>
      </Router>
    </Container>
  );
}

export default App;

