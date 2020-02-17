import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from "redux-thunk"
import { persistStore } from 'redux-persist'

import persistedReducer from "./rootReducer"

const middleware = [thunk]

if(process.env.NODE_ENV==="development"){
    middleware.push(logger);
}

export const store = createStore(persistedReducer,applyMiddleware(...middleware))
export const persistor = persistStore(store)