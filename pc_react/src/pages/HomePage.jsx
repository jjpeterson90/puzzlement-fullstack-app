import { useState } from 'react'
import LoginRegister from '../components/home/LoginRegister'
import PuzzlesHome from '../components/home/PuzzlesHome'

function HomePage ( {user, handleLoginForm, handleLogout} ) {

  return (
    <>
      { !user
        ?
        <LoginRegister handleLoginForm={handleLoginForm} />
        :
        <PuzzlesHome handleLogout={handleLogout} />
      }
    </>
  )
}

export default HomePage