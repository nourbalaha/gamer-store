import React, { Component } from 'react'
import { connect } from 'react-redux'

import "./Platforms.style.scss"

class Platforms extends Component {

    handleClick = platform => {
        this.props.setPlatform(platform);
      };

    render() {
        return (
            <div className="search-section">
            <span className="selected-platform">
              {this.props.platform}
            </span>
            <div className="platforms">
              <span
                className="platform all"
                onClick={() => this.handleClick("All Platforms")}
              >
                All Platforms
              </span>
              <span
                className="platform"
                onClick={() => this.handleClick("Playstation 4")}
              >
                Playstation 4
              </span>
              <span
                className="platform"
                onClick={() => this.handleClick("Xbox One")}
              >
                Xbox One
              </span>
              <span
                className="platform"
                onClick={() => this.handleClick("Nintendo Switch")}
              >
                Nintendo Switch
              </span>
            </div>
          </div>
        )
    }
}


function mapState(state) {
    return { 
      platform: state.inventory.platform,
    };
  }
  
  function mapDispatch(dispatch){
    return {
      setPlatform(platform){
        dispatch({type:"SET_PLATFORM", payload: {platform}})
      },
    }
  }
  
  export default connect(mapState, mapDispatch)(Platforms);