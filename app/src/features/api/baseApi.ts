import { fetchBaseQuery, retry, createApi } from "@reduxjs/toolkit/query/react"

const baseUrl = import.meta.env.VITE_URI || 'http://localhost:3000'

const baseQuery = retry(
    fetchBaseQuery({
        baseUrl,
        timeout: 15000
    }),
    { maxRetries: 3 }
)

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    endpoints: () => ({})
})