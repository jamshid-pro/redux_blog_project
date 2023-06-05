import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../slice/auth"
import articleReducer from '../slice/article'

export default configureStore({
    reducer:{
        auth: authReducer,
        article: articleReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})