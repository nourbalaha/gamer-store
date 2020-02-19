import React from 'react'
import PropTypes from "prop-types"

import './Home.style.scss'

const Home = props => {
  const handleLogin = () => {
    props.history.push('/signin')
  }
  const handleRegister = () => {
    props.history.push('/register')
  }
  return (
    <div className='home-page'>
      <div className='home-btn-container'>
        <button className='home-btn' onClick={handleLogin}>
          LOGIN
        </button>
        <button className='home-btn' onClick={handleRegister}>
          REGISTER
        </button>
      </div>
    </div>
  )
}

Home.propTypes = {
    history: PropTypes.object,
}

export default Home
