import {RootState} from '@/store/store'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1/user',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token
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
    updateProfile: builder.mutation({
      query: (body: {firstName: string | null; lastName: string | null}) => {
        return {
          url: 'profile',
          method: 'POST',
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

export const {useLoginMutation, useProfileMutation} = authApi
