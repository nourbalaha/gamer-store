import React from 'react'
import PropTypes from "prop-types"
import Particles from 'react-particles-js';

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
    <Particles
    className='particles'
    params={{
      "particles": {
          "number": {
              "value": 60,
              "density": {
                  "enable": true,
                  "value_area": 1500
              }
          },
          "line_linked": {
              "enable": true,
              "opacity": 0.02
          },
          "move": {
              "direction": "right",
              "speed": 0.05
          },
          "size": {
              "value": 1
          },
          "opacity": {
              "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0.05
              }
          }
      },
      "interactivity": {
          "events": {
              "onclick": {
                  "enable": true,
                  "mode": "push"
              }
          },
          "modes": {
              "push": {
                  "particles_nb": 1
              }
          }
      },
      "retina_detect": true
    }}
  />
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
