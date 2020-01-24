import React from "react";
import { connect } from "react-redux";

import "./Dropdown.style.scss";

import profile from "../../assets/Profile-Placeholder.png"

import { auth } from "../../firebase/firebase.config";

class Dropdown extends React.Component {
  handleSignout = async () => {
    try {
      await auth.signOut();
    } catch(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode)
      console.log(errorMessage)
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
  return { currentUser: state.auth.currentUser };
}

export default connect(mapState, null)(Dropdown);
