// Initial State
const initial_state = {
    messages: []
  }
  
  // Reducer
  function flashReducer (state = initial_state, action) {
    switch (action.type) {
  
      case 'ADD_MSG':
        const id = state.messages.length>0?state.messages[state.messages.length -1].id +1 : 0
        action.payload.id = id
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