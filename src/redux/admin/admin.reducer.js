// Initial State
const initial_state = {
    admin: false
  }
  
  // Reducer
  function adminReducer (state = initial_state, action) {
    switch (action.type) {
      case "SET_ADMIN":
        return {
          admin: true
        }
      case "SET_USER":
        return {
          admin: false
        }
      default:
        return state;
    }
  }
  
  export default adminReducer;