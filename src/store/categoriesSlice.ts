import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { Category } from '../types';

interface CategoriesState {
  transactions: any;
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axiosApi.get('/categories.json');
    const categoriesData: Category[] = [];
    for (let key in response.data) {
      categoriesData.push({ id: key, ...response.data[key] });
    }
    return categoriesData;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    editCategory: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index].name = action.payload.name;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
