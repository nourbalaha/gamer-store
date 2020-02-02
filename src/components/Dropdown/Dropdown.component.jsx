import React from "react";
import { connect } from "react-redux";

import "./Dropdown.style.scss";

import profile from "../../assets/Profile-Placeholder.png"

import { auth } from "../../firebase/firebase.config";

class Dropdown extends React.Component {
  handleSignout = async () => {
    try {
      await auth.signOut();
      this.props.addFlashMsg({msg:"You Have Been Logged Out Succefully!", type: "success", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
    } catch(error) {
      this.props.addFlashMsg({msg:error.message, type: "error", id: this.props.messages.length>0?this.props.messages[this.props.messages.length -1].id +1 : 0})
    };
  };

  render() {
    return (
      <div className="dropdown">
        <span className="dropbtn">
          PROFILE <i className="fa fa-caret-down" />
        </span>
        <div className="dropdown-content">
            <div className="profile">
          <img
            src={this.props.currentUser.photoURL?this.props.currentUser.photoURL:profile}
            alt="profile"
            className="profile-img"
          />
          <span className="profile-name">
            {this.props.currentUser.displayName}
          </span>
          <span className="profile-email">
            {this.props.currentUser.email}
          </span>
          <span className="profile-email">
            {this.props.admin?"admin":""}
          </span>
            </div>
          <hr />
          <span className="link" onClick={this.handleSignout}>
            LOGOUT
          </span>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { 
    currentUser: state.auth.currentUser, 
    admin: state.admin.admin,
    messages: state.flash.messages,
  }
}

function mapDispatch(dispatch){
  return {
    addFlashMsg(payload){
      dispatch({type:"ADD_MSG", payload})
    }
  }
}

export default connect(mapState, mapDispatch)(Dropdown);
