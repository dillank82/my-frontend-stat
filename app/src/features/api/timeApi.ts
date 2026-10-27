import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface timeApiType {
        minutes: number
    }

const URL = (import.meta.env.VITE_URI || 'http://localhost:3000') + '/time'

export const timeApi = createApi({
    reducerPath: 'timeApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getTime: builder.query<timeApiType, void>({
            query: () => '/'
        })
    })
})

export const { useGetTimeQuery } = timeApi