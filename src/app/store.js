import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blogSlice";
import categoryReducer from "../features/category/categorySlice";




export const store = configureStore({
  reducer: {
    blog: blogReducer,
    category: categoryReducer,
  },
});
