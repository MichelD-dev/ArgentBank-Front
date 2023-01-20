import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: (body: {email: string; password: string}) => {
        return {
          url: 'user/login',
          method: 'post',
          body,
        }
      },
    }),
  }),
})

export const {useLoginMutation} = authApi
