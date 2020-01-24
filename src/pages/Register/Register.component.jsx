import React, { Component } from 'react'

import './Register.style.scss'

import google from "../../assets/google-icon.png"

import { auth, signInWithGoogle } from "../../firebase/firebase.config"

export default class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:"",
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

    handleRegister = async ()=>{
      try {
        await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        const user = auth.currentUser;
        await user.updateProfile({
          displayName: this.state.name,
        })
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
      <div className='register-page'>
        <div className="register-form">
        <span className="title">Register</span>
        <button className='google' onClick={this.handleSignInWithGoogle}><img className="google_logo" src={google} alt="google logo" />Use Google Account</button>
        <br />
        <p>or</p>

          <input
            className='input'
            name='name'
            type='text'
            placeholder='Name'
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
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

          <input className='btn' type="button" value='Register' onClick={this.handleRegister} />
          <p>Already have an account? <span className="log-in" onClick={()=>this.props.history.push("/signin")}>Log In</span></p>
        </div>
      </div>
    )
  }
}