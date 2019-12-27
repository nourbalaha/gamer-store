import React, { Component } from 'react'

import './Register.style.scss'

import google from "../../assets/google-icon.png"

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

  render () {
    return (
      <div className='register-page'>
        <form className="register-form">
        <span className="title">Register</span>
        <button className='google'><img className="google_logo" src={google} alt="google logo" />Use Google Account</button>
        <br />
        <p>or</p>

          <input
            className='input'
            name='name'
            type='text'
            placeholder='Name'
            value={this.state.name}
            onChange={this.handleChange}
          />
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

          <input className='btn' type='submit' value='Register' />
          <p>Already have an account? <span className="log-in" onClick={()=>this.props.history.push("/signin")}>Log In</span></p>
        </form>
      </div>
    )
  }
}