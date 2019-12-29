import React, { Component } from 'react'
import { connect } from "react-redux"

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

    handleSignInWithGoogle=()=>{
      signInWithGoogle()
      .then((result)=>{
        console.log(result)
        this.props.history.push("/inventory")
      })
    }

    handleSignIn=()=>{
      auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>{
        this.props.history.push("/inventory")
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode)
        console.log(errorMessage)
      });
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

function mapState(state) {
  return { currentUser: state.auth.currentUser };
}

function mapDispatch(dispatch) {
  return {
    onAddUser(payload) {
      dispatch({ type: "ADD_USER", payload });
    }
  };
}

export default connect(mapState,mapDispatch)(SignIn);