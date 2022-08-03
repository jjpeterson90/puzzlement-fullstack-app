import { useState } from 'react'
import LoginRegister from '../components/LoginRegister'
import PuzzlesHome from '../components/PuzzlesHome'

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