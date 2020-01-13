// Initial State
const initial_state = {
  cart: {}
}

// Reducer
function cartReducer (state = initial_state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
        const newState = JSON.parse(JSON.stringify(state.cart));
        if(newState.hasOwnProperty(action.payload.id)){
            newState[action.payload.id].quantity = newState[action.payload.id].quantity +1
        } else {
            newState[action.payload.id] = action.payload;
            newState[action.payload.id].quantity = 1;
        }
      return {
        cart: newState
      }
    case 'DELETE_CART':
      return {
        cart: {}
      }
    default:
      return state
  }
}

export default cartReducer
