import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store/store'
import {PURGE} from 'redux-persist'
import {createSelector} from 'reselect'

export interface AuthState {
  token: string | null
  userName: {
    firstName: string | null
    lastName: string | null
  }
  persistIsChecked: boolean
}

const initialState: AuthState = {
  token: null,
  userName: {
    firstName: null,
    lastName: null,
  },
  persistIsChecked: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        token: string | null
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
    toggleCheck: state => {
      state.persistIsChecked = !state.persistIsChecked
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState)
  },
})

export const {setToken, setUserName, editUserName, toggleCheck} =
  authSlice.actions

export default authSlice.reducer

export const getMemoizedUser = createSelector(
  (state: RootState) => state.auth.userName,
  userName => {
    return {firstName: userName.firstName, lastName: userName.lastName}
  },
)
