import { baseApi } from "./baseApi"

export interface tasksApiType {
    siteId: string
    name: string
    solved: number
    failed: number
    orderIndex: number
}

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSites: builder.query<tasksApiType[], void>({
            query: () => '/sites'
        }),
        getSiteById: builder.query<tasksApiType, Partial<tasksApiType>>({
            query: ({ siteId }) => ({
                url: `sites/${siteId}`
            })
        })
    })
})

export const { useGetAllSitesQuery, useGetSiteByIdQuery } = tasksApi