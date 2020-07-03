import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Particles from 'react-particles-js';

import './SignIn.style.scss'

import google from '../../assets/google-icon.png'

import { auth, signInWithGoogle } from '../../firebase/firebase.config'

const SignIn = ({ addFlashMsg, history }) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = event => {
    const { name, value } = event.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle()
      addFlashMsg({
        msg: 'You Have Been Logged In Successfully!',
        type: 'success'
      })
    } catch (error) {
      addFlashMsg({ msg: error.message, type: 'error' })
    }

    history.push('/inventory')
  }

  const handleSignIn = async () => {
    if (user.email.length > 0 && user.password.length > 0) {
      try {
        await auth.signInWithEmailAndPassword(user.email, user.password)
        addFlashMsg({
          msg: 'You Have Been Logged In Successfully!',
          type: 'success'
        })
      } catch (error) {
        addFlashMsg({ msg: error.message, type: 'error' })
      }
      history.push('/inventory')
    } else {
      addFlashMsg({ msg: 'please enter required field', type: 'error' })
    }
  }

  return (
    <div className='sign-in-page'>
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
      <div className='sign-in-form'>
        <span className='title'>Log In</span>
        <button className='google' onClick={handleSignInWithGoogle}>
          <img className='google_logo' src={google} alt='google logo' />Use
          Google Account
        </button>
        <br />
        <p>or</p>

        <input
          className='input'
          name='email'
          type='email'
          placeholder='Email Address'
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          className='input'
          name='password'
          type='password'
          placeholder='Password'
          value={user.password}
          onChange={handleChange}
          required
        />

        <button className='btn' onClick={handleSignIn}>
          LOGIN
        </button>
        <p>
          Don`&apos;`t have an account?
          <span className='sign-up' onClick={() => history.push('/register')}>
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

SignIn.propTypes = {
  addFlashMsg: PropTypes.func,
  history: PropTypes.object
}

const mapDispatch = dispatch => {
  return {
    addFlashMsg (payload) {
      dispatch({ type: 'ADD_MSG', payload })
    }
  }
}

export default connect(null, mapDispatch)(SignIn)
