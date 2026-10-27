import { baseApi } from "./baseApi"

export interface projectsApiType {
    projectsCount: number,
}

export const projectsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<projectsApiType, void>({
            query: () => '/projects'
        })
    })
})

export const { useGetProjectsQuery } = projectsApi