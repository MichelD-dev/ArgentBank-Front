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
    login: builder.mutation<{body: {token: string}}, Credentials>({
      query: credentials => {
        return {
          url: 'login',
          method: 'POST',
          body: credentials,
        }
      },
    }),
    profile: builder.mutation({
      query: () => {
        return {
          url: 'profile',
          method: 'POST',
        }
      },
    }),
    updateProfile: builder.mutation<Names, Names>({
      query: names => {
        return {
          url: 'profile',
          method: 'PUT',
          body: names,
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
export interface ProfileDatas extends Names {
  email: string
  createdAt: string
  updatedAt: string
  id: string
}

export const {useLoginMutation, useProfileMutation, useUpdateProfileMutation} =
  authApi
