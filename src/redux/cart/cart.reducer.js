// Initial State
const initial_state = {
    cart: []
  }
  
  // Reducer
  function cartReducer (state = initial_state, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          cart: [...state.cart, action.payload]
        }
      default:
        return state;
    }
  }
  
  export default cartReducer;