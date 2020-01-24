import React, { Component } from 'react'

import './SignIn.style.scss'

import google from "../../assets/google-icon.png"

import {auth, signInWithGoogle} from "../../firebase/firebase.config"

class SignIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:"",
             password: ""
        }
    }
    
    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSignInWithGoogle = async ()=>{
      try {
        await signInWithGoogle()
      } catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode)
        console.log(errorMessage)
      };
      
      this.props.history.push("/inventory")
    }
    
    handleSignIn = async ()=>{
      try {
        await auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      } catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode)
        console.log(errorMessage)
      };

      this.props.history.push("/inventory")
    }

  render () {
    return (
      <div className='sign-in-page'>
        <div className="sign-in-form">
        <span className="title">Log In</span>
        <button className='google' onClick={this.handleSignInWithGoogle}><img className="google_logo" src={google} alt="google logo" />Use Google Account</button>
        <br />
        <p>or</p>

          <input
            className='input'
            name='email'
            type='email'
            placeholder='Email Address'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            className='input'
            name='password'
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input className='btn' type='button' value='Log In' onClick={this.handleSignIn} />
          <p>Don't have an account? <span className="sign-up" onClick={()=>this.props.history.push("/register")}>Register</span></p>
        </div>
      </div>
    )
  }
}

export default SignIn;