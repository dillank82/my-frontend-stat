import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface projectsApiType {
    projectsCount: number,
}

const URL = (import.meta.env.VITE_URI || 'http://localhost:3000') + '/projects'

export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getProjects: builder.query<projectsApiType, void>({
            query: () => '/'
        })
    })
})

export const { useGetProjectsQuery } = projectsApi