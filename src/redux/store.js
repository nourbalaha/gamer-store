import { createStore } from 'redux'

import inventory from '../data/inventory'

// Initial State
const initial_state = {
  inventory
}

// Reducer
function reducer (state = initial_state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { inventory: [...state, action.payload] }
    case 'UPDATE_ITEM':
      const updated_inventory = [...state]
      let id
      updated_inventory.forEach((item, index) => {
        if (item.id === action.payload.id) {
          id = index
        }
      })
      updated_inventory.splice(id, 1, action.payload)
      return { inventory: [...updated_inventory] }
    case 'DELETE_ITEM':
      const deleted_inventory = [...state]
      let id2
      deleted_inventory.forEach((item, index) => {
        if (item.id === action.payload.id) {
          id2 = index
        }
      })
      deleted_inventory.splice(id2, 1)
      return { inventory: [...deleted_inventory] }
    default:
      return state
  }
}

let store = createStore(reducer)
export default store
