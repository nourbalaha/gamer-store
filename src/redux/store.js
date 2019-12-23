import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'

import inventory from '../data/inventory'

// Initial State
const initial_state = {
  inventory
}

// Reducer
function reducer (state = initial_state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { inventory: [...state.inventory, action.payload] }
    case 'UPDATE_ITEM':
      const updated_inventory = [...state.inventory]
      let id
      updated_inventory.forEach((item, index) => {
        if (item.id === action.payload.id) {
          id = index
        }
      })
      updated_inventory.splice(id, 1, action.payload)
      return { inventory: [...updated_inventory] }
    case 'DELETE_ITEM':
      let deleted_inventory = [...state.inventory]
      deleted_inventory = deleted_inventory.filter(item=>Number(item.id)!==Number(action.payload.id))

    //   let id2
    //   deleted_inventory.forEach((item, index) => {
    //     if (item.id === action.payload.id) {
    //       id2 = index
    //     }
    //   })
    //   deleted_inventory.splice(id2, 1)
      return { inventory: [...deleted_inventory] }
    default:
      return state
  }
}

let store = createStore(reducer,applyMiddleware(logger))
export default store


