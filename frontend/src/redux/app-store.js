import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../views/auths/store"
// import { authReducer } from '.';

export default configureStore({
    reducer: {
        auth: authReducer
  },
})