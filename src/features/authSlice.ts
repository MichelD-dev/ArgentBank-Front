import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store/store'
import {PURGE} from 'redux-persist'

export interface AuthState {
  token: string | null
  userName: {
    firstName: string | null
    lastName: string | null
  }
  persistCheck: boolean
}

const initialState: AuthState = {
  token: null,
  userName: {
    firstName: null,
    lastName: null,
  },
  persistCheck: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        token: string
      }>,
    ) => {
      state.token = action.payload.token
    },
    setUserName: (
      state,
      action: PayloadAction<{
        userName: {
          firstName: string | null
          lastName: string | null
        }
      }>,
    ) => {
      state.userName = action.payload.userName
    },
    editUserName: (
      state,
      action: PayloadAction<{
        userName: {
          firstName: string | null
          lastName: string | null
        }
      }>,
    ) => {
      state.userName = action.payload.userName
    },
    setPersistCheck: (
      state,
      action: PayloadAction<{
        PersistCheck: boolean
      }>,
    ) => {
      state.persistCheck = action.payload.PersistCheck
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState)
  },
})

export const selectAuth = (state: RootState) => state.auth

export const {setToken, setUserName, editUserName, setPersistCheck} =
  authSlice.actions

export default authSlice.reducer
