import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getCategories, createCategory, deleteCategory } from '../services/category.service';

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const categories = await getCategories();
  console.log("categories: ", categories)
  return categories;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
  console.log("newCategory: ", category)
  const newCategory = await createCategory(category);
  return newCategory;
});

export const removeCategory = createAsyncThunk('categories/removeCategory', async (id) => {
  await deleteCategory(id);
  return id;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;

export const selectAllCategory = createSelector(
  (state) => state.category.categories,
  (categories) => {
    if (Array.isArray(categories)) {
      return categories;
    }
    return [];
  }
);

