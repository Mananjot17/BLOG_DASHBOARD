import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import {persistReducer, persistStore} from "redux-persist"
import storage from 'redux-persist/lib/storage';

// use to combine all the redusers like user, post, messages etc into one reducer
// i.e , root reducer
const rootReducer = combineReducers({
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    //Middleware in Redux is like a middle layer where you can run some code between dispatching
    //an action and the moment it reaches the reducer.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}), 
});

export const persistor = persistStore(store);


{/*What Does serializableCheck Do?
The serializableCheck middleware ensures that the actions and the state 
you are passing around in Redux can be turned into a string (serialized). 
This is important because it ensures that your state can be easily saved, 
logged, or sent over the network.

Why Disable serializableCheck?
Sometimes, you need to store things in your Redux state that can't be easily 
turned into a string, such as:

Functions, Dates, Special objects like those created by libraries
When you use redux-persist to save your state to local storage or session 
storage, you might run into these issues. To prevent errors and warnings 
from serializableCheck, you disable it. */}