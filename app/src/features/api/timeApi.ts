import { baseApi } from "./baseApi"

export interface timeApiType {
        minutes: number
    }

export const timeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTime: builder.query<timeApiType, void>({
            query: () => '/time'
        })
    })
})

export const { useGetTimeQuery } = timeApi