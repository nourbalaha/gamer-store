import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import logo from "../../assets/Logo white.png"
import google from "../../assets/google-icon.png"

import "../Navbar/Navbar.style.scss"

import {signInWithGoogle, auth} from "../../firebase/firebase.config"

class Navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currentUser:null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({currentUser:user})
      } else {
        this.setState({currentUser:null})
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  handleSignIn=()=>{
    signInWithGoogle()
  }
  
  handleSignout=()=>{
    auth.signOut()
  }

  render() {
    let item;
    if(typeof this.state.currentUser=="object" && !this.state.currentUser){
      item= <span className="nav-item google_button" onClick={this.handleSignIn}><img className="google_logo" src={google} alt="google logo" />sign in with google</span>
    } else {
      item=<span className="nav-item" onClick={this.handleSignout}>Logout</span>
    }
    return (
      <nav className="navbar">
        <img className="logo" src={logo} alt="logo" onClick={()=>this.props.history.push("/")}/>
        <ul>
          <li>
            <span className="nav-item" onClick={()=>this.props.history.push("/inventory")}>INVENTORY</span>
          </li>
          <li>
            <span className="nav-item" onClick={()=>this.props.history.push("/additem")}>ADD ITEM</span>
          </li>
          <li>
            {
              item

            }
            </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);