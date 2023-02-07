import {RootState} from '@/store/store'
import type { TokenType, UserCredentialsType, UserNameType } from '@/types/user.model'
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
    login: builder.mutation<{body: {token: TokenType}}, UserCredentialsType>({
      query: credentials => {
        return {
          url: 'login',
          method: 'POST',
          body: credentials,
        }
      },
    }),
    getProfile: builder.mutation({
      query: () => {
        return {
          url: 'profile',
          method: 'POST',
        }
      },
    }),
    updateProfile: builder.mutation<UserNameType, UserNameType>({
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

export const {useLoginMutation, useGetProfileMutation, useUpdateProfileMutation} =
  authApi
