import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface TransactionssState {
  transactions: {
    id: number
    quantity: number
  }[]
}

const initialState: TransactionssState = {
  transactions: [],
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    updateTransaction: (
      state,
      action: PayloadAction<{
        id: number
        quantity: number
      }>,
    ) => {
      const {id, quantity} = action.payload
      const transactionToUpdate = state.transactions.find(
        transaction => transaction.id === id,
      )
      if (!transactionToUpdate) return

      transactionToUpdate.quantity = quantity
    },
    removeTransaction: (
      state,
      action: PayloadAction<{
        id: number
      }>,
    ): {
      id: number
      quantity: number
    }[] => {
      return state.transactions.filter(
        transaction => transaction.id !== action.payload.id,
      )
    },
  },
})

export interface Names {
  firstName: string
  lastName: string
}
// User Profile Data Interface
// export interface ProfileDatas extends Names {
//   email: string
//   createdAt: string
//   updatedAt: string
//   id: string
// }