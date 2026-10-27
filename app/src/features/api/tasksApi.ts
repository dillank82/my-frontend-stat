import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface tasksApiType {
    siteId: string
    name: string
    solved: number
    failed: number
    orderIndex: number
}

const URL = (import.meta.env.VITE_URI || 'http://localhost:3000') + '/sites'

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getAllSites: builder.query<tasksApiType[], void>({
            query: () => '/'
        }),
        getSiteById: builder.query<tasksApiType, Partial<tasksApiType>>({
            query: ({ siteId }) => ({
                url: `/${siteId}`
            })
        })
    })
})

export const { useGetAllSitesQuery, useGetSiteByIdQuery } = tasksApi