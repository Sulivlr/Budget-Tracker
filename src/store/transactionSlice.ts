import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { transaction } from '../types';

interface TransactionState {
  transactions: transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<transaction>) => {
      state.transactions.push(action.payload);
    },
    editTransaction: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index].name = action.payload.name;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
