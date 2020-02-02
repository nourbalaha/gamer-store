import authReducer from "./auth/auth.reducer"
import inventoryReducer from "./inventory/inventory.reducer"
import cartReducer from "./cart/cart.reducer"
import adminReducer from "./admin/admin.reducer"
import flashReducer from "./flash/flash.reducer"

import { combineReducers } from "redux"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    inventory: inventoryReducer,
    auth: authReducer,
    cart: cartReducer,
    admin: adminReducer,
    flash: flashReducer,
})

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer;