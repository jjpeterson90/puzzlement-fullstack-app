import './App.css'
import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import HomePage from './pages/HomePage'
import RiddlesPage from './pages/RiddlesPage'
import ImageSliderPage from './pages/ImageSliderPage'

const getCSRFToken = () => {
  let csrfToken
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const crumbs = cookie.split('=')
    if (crumbs[0].trim() === 'csrftoken') {
      csrfToken = crumbs[1]
    }
  }
  return csrfToken
}
axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()


function App() {

  const [ user, setUser ] = useState(null)

  const handleLoginForm = (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value

    // '/signup' or '/login' depending on button pressed
    let eventType = event.nativeEvent.submitter.value

    axios.post(eventType, {
      username:username,
      password:password,
    }).then((response) => {
      if (response.data['success']) {
        setUser(response.data['user'])
        window.location.reload()
      }
      else {
        // failed to login
        window.location.reload()
      }
    })
  }

  const handleLogout = () => {
    axios.post('/logout').then((response) => {
      console.log('logout response: ', response)
      window.location.reload()
    })
  }

  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    console.log('whoami: ', response.data)
    setUser(response.data['user'])
  }

  // set user on login
  useEffect( () => {
    whoAmI()
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={ 
            <HomePage handleLoginForm={handleLoginForm} handleLogout={handleLogout} user={user}/> 
          } />
          <Route path='/riddles' element={ <RiddlesPage /> } />
          <Route path='/imageslider' element={ <ImageSliderPage />} />
        </Routes>
      </Router>      
    </>

  );
}

export default App;