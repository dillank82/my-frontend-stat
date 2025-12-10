import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface tasksApiType {
    siteId: string
    name: string
    solved: number
    failed: number
    orderIndex: number
}

const URL = (process.env.URI || 'http://localhost:3000') + '/sites'

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    tagTypes: ['Site'],
    endpoints: (builder) => ({
        createSite: builder.mutation<tasksApiType, Partial<tasksApiType>>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Site', id: 'LIST'}]
        }),
        getAllSites: builder.query<tasksApiType[], void>({
            query: () => '/',
            providesTags: (result = []) => [
                { type: 'Site', id: 'LIST' },
                ...result.map(({ siteId }): { type: 'Site', id: string } => ({ type: 'Site', id: siteId }))
            ]
        }),
        getSiteById: builder.query<tasksApiType, Partial<tasksApiType>>({
            query: ({ siteId }) => ({
                url: `/${siteId}`,
            }),
            providesTags: (args) => [{ type: 'Site', id: args?.siteId }]
        }),
        setSite: builder.mutation<tasksApiType, Partial<tasksApiType>>({
            query: (body) => ({
                url: `/${body.siteId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: (args) => [{ type: 'Site', id: args?.siteId }, { type: 'Site', id: 'LIST' }]
        }),
        editSite: builder.mutation<tasksApiType, Partial<tasksApiType>>({
            query: (body) => ({
                url: `/${body.siteId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: (args) => [{ type: 'Site', id: args?.siteId }, { type: 'Site', id: 'LIST' }]
        }),
        deleteSite: builder.mutation<tasksApiType, Partial<tasksApiType>>({
            query: ({ siteId }) => ({
                url: `/${siteId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (args) => [{ type: 'Site', id: args?.siteId }, { type: 'Site', id: 'LIST' }]
        })
    })
})

export const { useCreateSiteMutation, useDeleteSiteMutation, useEditSiteMutation, useGetAllSitesQuery, useGetSiteByIdQuery, useSetSiteMutation } = tasksApi