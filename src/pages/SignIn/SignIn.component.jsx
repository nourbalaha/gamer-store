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

    handleSignInWithGoogle = async ()=>{
      try {
        await signInWithGoogle()
        this.props.addFlashMsg({msg:"You Have Been Logged In Successfully!", type: "success", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
      } catch(error) {
        this.props.addFlashMsg({msg:error.message, type: "error", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
      };
      
      this.props.history.push("/inventory")
    }
    
    handleSignIn = async ()=>{
      try {
        await auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        this.props.addFlashMsg({msg:"You Have Been Logged In Successfully!", type: "success", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
      } catch(error) {
        this.props.addFlashMsg({msg:error.message, type: "error", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
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

          <button className='btn' onClick={this.handleSignIn}>LOGIN</button>
          <p>Don't have an account? <span className="sign-up" onClick={()=>this.props.history.push("/register")}>Register</span></p>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    messages: state.flash.messages
  }
}

const mapDispatch = dispatch => {
  return {
    addFlashMsg(payload){
      dispatch({type:"ADD_MSG", payload})
    }
  }
}

export default connect(mapState, mapDispatch)(SignIn);