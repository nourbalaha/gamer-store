import React, { useState } from "react";
import { connect } from "react-redux";

import "./Dropdown.style.scss";

import profile from "../../assets/Profile-Placeholder.png"

import { auth } from "../../firebase/firebase.config";

const Dropdown = ({ addFlashMsg, currentUser, admin }) => {
  const [display, toggleDisplay] = useState(false);
  const handleSignout = async () => {
    try {
      await auth.signOut();
      addFlashMsg({ msg:"You Have Been Logged Out Succefully!", type: "success" })
    } catch(error) {
      addFlashMsg({ msg:error.message, type: "error" })
    };
  };

  const handleClick = () => {
    toggleDisplay(!display);
  }

  return (
    <div className="dropdown">
      <span className="dropbtn" onClick={handleClick}>
        PROFILE <i className="fa fa-caret-down" />
      </span>
      <div className="dropdown-content" style={{display: display?"block":"none"}}>
          <div className="profile">
        <img
          src={currentUser.photoURL?currentUser.photoURL:profile}
          alt="profile"
          className="profile-img"
        />
        <span className="profile-name">
          {currentUser.displayName}
        </span>
        <span className="profile-email">
          {currentUser.email}
        </span>
        <span className="profile-email">
          {admin?"admin":""}
        </span>
          </div>
        <hr />
        <span className="link" onClick={handleSignout}>
          LOGOUT
        </span>
      </div>
    </div>
  );
}

function mapState(state) {
  return { 
    currentUser: state.auth.currentUser, 
    admin: state.admin.admin,
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
