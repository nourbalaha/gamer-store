import React, { Component } from 'react'

import './SignIn.style.scss'

import google from "../../assets/google-icon.png"

export default class SignIn extends Component {
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

  render () {
    return (
      <div className='sign-in-page'>
        <form className="sign-in-form">
        <span className="title">Log In</span>
        <button className='google'><img className="google_logo" src={google} alt="google logo" />Use Google Account</button>
        <br />
        <p>or</p>

          <input
            className='input'
            name='email'
            type='text'
            placeholder='Email Address'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            className='input'
            name='password'
            type='text'
            placeholder='Password'
            value={this.state.pasword}
            onChange={this.handleChange}
          />

          <input className='btn' type='submit' value='Log In' />
          <p>Don't have an account? <span className="sign-up" onClick={()=>this.props.history.push("/register")}>Register</span></p>
        </form>
      </div>
    )
  }
}
