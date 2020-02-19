import React from "react";
import { connect } from 'react-redux'

import "./SearchBar.style.scss";

const SearchBar = ({ setSearch, search }) => {

  const handleChange = event => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <input
      id="search"
      name="search"
      type="text"
      placeholder="search"
      value={search}
      onChange={handleChange}
    />
  );
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


