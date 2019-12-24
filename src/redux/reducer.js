import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import inventory from '../data/inventory'

const persistConfig = {
    key: 'root',
    storage,
  }

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
      let updated_inventory = [...state.inventory]
      updated_inventory = updated_inventory.map(item=>{
        if (Number(item.id) === Number(action.payload.id)) {
            return action.payload
          }else {
              return item
          }
      })
      return { inventory: [...updated_inventory] }

    case 'DELETE_ITEM':
      let deleted_inventory = [...state.inventory]
      deleted_inventory = deleted_inventory.filter(item=>Number(item.id)!==Number(action.payload.id))
      return { inventory: [...deleted_inventory] }
    default:
      return state
  }
}

const persistedReducer = persistReducer(persistConfig, reducer)
export default persistedReducer;