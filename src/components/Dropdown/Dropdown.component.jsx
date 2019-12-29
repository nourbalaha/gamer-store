import React from "react";
import { connect } from "react-redux";

import "./Dropdown.style.scss";

import profile from "../../assets/Profile-Placeholder.png"

import { auth } from "../../firebase/firebase.config";

class Dropdown extends React.Component {
  handleSignout = () => {
    auth.signOut();
  };

  render() {
    return (
      <div class="dropdown">
        <span class="dropbtn">
          PROFILE <i class="fa fa-caret-down" />
        </span>
        <div class="dropdown-content">
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
