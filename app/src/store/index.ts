import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "../features/tasks/tasksSlice.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "../features/api/baseApi.ts";

export const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(baseApi.middleware)
 })

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch