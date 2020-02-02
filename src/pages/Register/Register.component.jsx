import React, { Component } from 'react'
import { connect } from "react-redux"

import './Register.style.scss'

import google from "../../assets/google-icon.png"

import { auth, signInWithGoogle } from "../../firebase/firebase.config"

class Register extends Component {
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
        this.props.addFlashMsg({msg:error.message, type: "error", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
      };
      this.props.history.push("/inventory")
    }
    
    handleRegister = async ()=>{
      if(this.state.name.length>0 && this.state.email.length>0  && this.state.password.length>0 ){
        try {
          await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
          const user = auth.currentUser;
          await user.updateProfile({
            displayName: this.state.name,
          })
        } catch(error) {
          this.props.addFlashMsg({msg:error.message, type: "error", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
        };
        this.props.history.push("/inventory")
      } else {
        this.props.addFlashMsg({msg:"please enter required field", type: "error", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
      }
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

          <button className='btn' onClick={this.handleRegister}>REGISTER</button>
          <p>Already have an account? <span className="log-in" onClick={()=>this.props.history.push("/signin")}>Log In</span></p>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    messages: state.flash.messages,
  }
}

const mapDispatch = dispatch => {
  return {
    addFlashMsg(payload){
      dispatch({type:"ADD_MSG", payload})
    }
  }
}

export default connect(mapState, mapDispatch)(Register);