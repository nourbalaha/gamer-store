import React from 'react'
import { connect } from 'react-redux'

import "./Platforms.style.scss"

const Platforms = ({ setPlatform, platform }) => {

    const handleClick = platform => {
        setPlatform(platform);
      };

    return (
          <div className="search-section">
          <span className="selected-platform">
            {platform}
          </span>
          <div className="platforms">
            <span
              className="platform all"
              onClick={() => handleClick("All Platforms")}
            >
              All Platforms
            </span>
            <span
              className="platform"
              onClick={() => handleClick("Playstation 4")}
            >
              Playstation 4
            </span>
            <span
              className="platform"
              onClick={() => handleClick("Xbox One")}
            >
              Xbox One
            </span>
            <span
              className="platform"
              onClick={() => handleClick("Nintendo Switch")}
            >
              Nintendo Switch
            </span>
          </div>
        </div>
      )
    
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