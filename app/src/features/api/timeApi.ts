import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface timeApiType {
        minutes: number
    }

const URL = 'http://localhost:3000/time'

export const timeApi = createApi({
    reducerPath: 'timeApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    tagTypes: ['Time'],
    endpoints: (builder) => ({
        getTime: builder.query<timeApiType, void>({
            query: () => '/',
            providesTags: ['Time'],
        }),
        setTime: builder.mutation<timeApiType, Partial<timeApiType>>({
            query: (body) => ({
                url: '/',
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Time']
        })
    })
})

export const { useGetTimeQuery, useSetTimeMutation } = timeApi