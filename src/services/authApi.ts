import {RootState} from '@/store/store'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/user',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      // console.log(token)
      return headers
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: (body: {email: string; password: string}) => {
        return {
          url: 'login',
          method: 'POST',
          body,
        }
      },
    }),
    profile: builder.mutation({
      query: (body: string) => {
        return {
          url: 'profile',
          method: 'POST',
          body,
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (body: {firstName: string; lastName: string}) => {
        return {
          url: 'profile',
          method: 'PUT',
          body,
        }
      },
    }),
  }),
})

// User Credentials Interface
export interface Credentials {
  email: string
  password: string
}
// User Names Interface
export interface Names {
  firstName: string
  lastName: string
}
// User Profile Data Interface
export interface ProfileDatas extends Credentials, Names {
  createdAt: string
  updatedAt: string
  id: string
}

export const {useLoginMutation, useProfileMutation, useUpdateProfileMutation} =
  authApi
