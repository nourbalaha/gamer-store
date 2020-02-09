import React, { Component } from "react";
import { connect } from 'react-redux'

import "./SearchBar.style.scss";

class SearchBar extends Component {

  handleChange = event => {
    this.props.setSearch(event.target.value.toLowerCase());
  };

  render() {
    return (
      <input
        id="search"
        name="search"
        type="text"
        placeholder="search"
        value={this.props.search}
        onChange={this.handleChange}
      />
    );
  }
}

const mapState = state => {
    return {
        search: state.inventory.search,
    }
}

const mapDispatch = dispatch => {
    return {
        setSearch(search){
            dispatch({type: "SET_SEARCH", payload: {search}})
        }
    }
}

export default connect(mapState, mapDispatch)(SearchBar);


