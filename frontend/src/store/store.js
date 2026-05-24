import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import productsReducer from "./slices/productsSlice.js";




// creating a store via the configure store function, passing the reducers to it, 
// the reducers are the functions that will handle the actions and update the state accordingly, 
// we can have multiple reducers for different slices of the state, and we combine them in the store
const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
    }
})

export default store;