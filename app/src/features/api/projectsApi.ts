import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface projectsApiType {
    projectsCount: number,
}

const URL = (process.env.URI || 'http://localhost:3000') + '/projects'

export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        getProjects: builder.query<projectsApiType, void>({
            query: () => '/',
            providesTags: ['Projects']
        }),
        setProjects: builder.mutation<projectsApiType, Partial<projectsApiType>>({
            query: (body) => ({
                url: '/',
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Projects']
        })
    })
})

export const { useGetProjectsQuery, useSetProjectsMutation } = projectsApi