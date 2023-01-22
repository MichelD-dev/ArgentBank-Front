import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store/store'

export interface AuthState {
  token: string | null
  userName: {
    firstName: string | null
    lastName: string | null
  }
}

const initialState: AuthState = {
  token: null,
  userName: {
    firstName: null,
    lastName: null,
  },
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
      localStorage.setItem('userToken', action.payload.token)
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
  },
})

export const selectAuth = (state: RootState) => state.auth

export const {setToken, setUserName} = authSlice.actions

export default authSlice.reducer

// export const selectCurrentToken = (state: RootState) => state.auth.token
