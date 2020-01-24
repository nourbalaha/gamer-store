// Initial State
const initial_state = {
  cart: {}
};

// Reducer
function cartReducer(state = initial_state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const newState = JSON.parse(JSON.stringify(state.cart));
      if (newState.hasOwnProperty(action.payload.id)) {
        newState[action.payload.id].quantity =
          newState[action.payload.id].quantity + 1;
      } else {
        newState[action.payload.id] = action.payload;
        newState[action.payload.id].quantity = 1;
      }
      return {
        cart: newState
      };

    case "REMOVE_ITEM":
      const newCart= JSON.parse(JSON.stringify(state.cart));
      delete newCart[action.payload.id];
      return {
        cart: newCart
      };

    case "SET_CART":;
      return {
        cart: action.payload
      };

    default:
      return state;
  }
}

export default cartReducer;
