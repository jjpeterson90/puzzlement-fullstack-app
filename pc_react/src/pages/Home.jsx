import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'


export default function Home() {

  return (
    <>
      <div className="home-title text-center">
        <h1>
          Puzzlement
        </h1>
      </div>
      <div className="game-links text-center">
        <Link to={'/riddles'} className="text-decoration-none text-white">
          <Button variant="home">
            Knotty Questions
          </Button>
        </Link>
        <Link to={'/imageslider'} className="text-decoration-none text-white">
          <Button variant="home">
            Untangle
          </Button>
        </Link>
        <Link to={'/lightsout'} className="text-decoration-none text-white">
          <Button variant="home">
            Unveil
          </Button>
        </Link>
      </div>
    </>
  )
}

