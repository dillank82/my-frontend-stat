import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "../features/tasks/tasksSlice.ts";
import { timeApi } from "../features/api/timeApi.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { projectsApi } from "../features/api/projectsApi.ts";
import { tasksApi } from "../features/api/tasksApi.ts";

export const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        [timeApi.reducerPath]: timeApi.reducer,
        [projectsApi.reducerPath]: projectsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(timeApi.middleware)
        .concat(projectsApi.middleware)
        .concat(tasksApi.middleware)
 })

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch