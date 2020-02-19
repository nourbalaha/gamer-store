// Initial State
const initial_state = {
  inventory: [],
  search: "",
  platform: "All Platforms",
}

// Reducer
function inventoryReducer (state = initial_state, action) {
  switch (action.type) {

    case 'ADD_ITEM':
      return { 
        inventory: [...state.inventory, action.payload],
        search: state.search,
        platform: state.platform,
      }

    case 'SET_INVENTORY':
      return { 
        inventory: action.payload,
        search: state.search,
        platform: state.platform,
      }

    case 'UPDATE_ITEM':
      let updated_inventory = [...state.inventory]
      updated_inventory = updated_inventory.map(item=>{
        if (Number(item.id) === Number(action.payload.id)) {
            return action.payload
          }else {
              return item
          }
      })
      return { 
        inventory: [...updated_inventory],
        search: state.search,
        platform: state.platform,
      }

    case 'DELETE_ITEM':
      let deleted_inventory = [...state.inventory]
      deleted_inventory = deleted_inventory.filter(item=>Number(item.id)!==Number(action.payload.id))
      return { 
        inventory: [...deleted_inventory],
        search: state.search,
        platform: state.platform,
      }

    case 'SET_SEARCH':
      return { 
        inventory: state.inventory,
        search: action.payload.search,
        platform: state.platform,
      }

    case 'SET_PLATFORM':
      return { 
        inventory: state.inventory,
        search: state.search,
        platform: action.payload.platform,
      }

    default:
      return state
  }
}

export default inventoryReducer;