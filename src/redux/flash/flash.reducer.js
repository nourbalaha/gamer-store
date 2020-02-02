// Initial State
const initial_state = {
    messages: []
  }
  
  // Reducer
  function flashReducer (state = initial_state, action) {
    switch (action.type) {
  
      case 'ADD_MSG':
        return { messages: [...state.messages, action.payload] }

      case 'DELETE_MSG':
          const splicedArray = state.messages.filter(item=>item.id!==action.payload.id)
        return { messages: [...splicedArray] }

      case 'RESET_MSG':
        return { messages: [] }

      default:
        return state
    }
  }
  
  export default flashReducer;