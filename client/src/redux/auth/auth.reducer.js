// Initial State
const initial_state = {
  currentUser: null
}

// Reducer
function authReducer (state = initial_state, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        currentUser: action.payload
      }
    default:
      return state;
  }
}

export default authReducer;