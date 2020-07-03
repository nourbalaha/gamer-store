import React, { useState } from 'react'
import { connect } from "react-redux"
import Particles from 'react-particles-js';

import './Register.style.scss'

import google from "../../assets/google-icon.png"

import { firestore, auth, signInWithGoogle } from "../../firebase/firebase.config"

const Register = ({ addFlashMsg, history }) => {

    const [ user, setUser ] = useState({
      name:"",
      email:"",
      password: ""
    })    
    
    const handleChange = event => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSignInWithGoogle = async ()=>{
      try {
        await signInWithGoogle()
      } catch(error) {
        addFlashMsg({msg:error.message, type: "error"})
      };
      history.push("/inventory")
    }
    
    const handleRegister = async ()=>{
      if(user.name.length > 0 && user.email.length > 0  && user.password.length > 0 ){
        try {
          await auth.createUserWithEmailAndPassword(user.email, user.password)
          const currentUser = auth.currentUser;
          await currentUser.updateProfile({
            displayName: user.name,
          })
          const userRef = firestore.collection("users").doc(currentUser.uid);
          await userRef.set({Name: user.name, Email: user.email, Role: "user"})
        } catch(error) {
          addFlashMsg({msg:error.message, type: "error"})
        };
        history.push("/inventory")
      } else {
        addFlashMsg({msg:"please enter required field", type: "error"})
      }
    }

    return (
      <div className='register-page'>
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
        <div className="register-form">
        <span className="title">Register</span>
        <button className='google' onClick={handleSignInWithGoogle}><img className="google_logo" src={google} alt="google logo" />Use Google Account</button>
        <br />
        <p>or</p>

          <input
            className='input'
            name='name'
            type='text'
            placeholder='Name'
            value={user.name}
            onChange={handleChange}
            required
          />
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

          <button className='btn' onClick={handleRegister}>REGISTER</button>
          <p>Already have an account? <span className="log-in" onClick={()=>history.push("/signin")}>Log In</span></p>
        </div>
      </div>
    )
  }

const mapDispatch = dispatch => {
  return {
    addFlashMsg(payload){
      dispatch({type:"ADD_MSG", payload})
    }
  }
}

export default connect(null, mapDispatch)(Register);