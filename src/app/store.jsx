import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import  { combineReducers } from "@reduxjs/toolkit"
import { thunk } from 'redux-thunk'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducer = combineReducers({
    authReducer
})


const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: () => [thunk]
});