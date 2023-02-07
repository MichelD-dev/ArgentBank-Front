import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store/store'
import {PURGE} from 'redux-persist'
import {createSelector} from 'reselect'
import type {AuthType, TokenType, UserType} from '@/types/user.model'

const initialState: AuthType = {
  token: '',
  userName: {
    firstName: '',
    lastName: '',
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
        token: TokenType
      }>,
    ) => {
      state.token = action.payload.token
    },
    setUserName: (
      state,
      action: PayloadAction<{
        userName: UserType
      }>,
    ) => {
      state.userName = action.payload.userName
    },
    editUserName: (
      state,
      action: PayloadAction<{
        userName: UserType
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
