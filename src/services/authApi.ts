import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/user',
    prepareHeaders: headers => {
      const token = localStorage.getItem('userToken')
      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: (body: {email: string | null; password: string | null}) => {
        return {
          url: 'login',
          method: 'POST',
          body,
        }
      },
    }),
    profile: builder.mutation<ProfileDatas, void>({
      query: () => {
        return {
          url: 'profile',
          method: 'POST',
        }
      },
    }),
  }),
})

// User Credentials Interface
export interface Credentials {
  email: string | null
  password: string | null
}
// User Names Interface
export interface Names {
  firstName: string | null
  lastName: string | null
}
// User Profile Data Interface
export interface ProfileDatas extends Credentials, Names {
  createdAt: string
  updatedAt: string
  id: string
}

export const {useLoginMutation, useProfileMutation} = authApi
