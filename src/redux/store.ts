import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slices/counterSlice";
import accountReducer from "./slices/accountSlice";
import blocksReducer from "./slices/blocksSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        account: accountReducer,
        blocks: blocksReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store