import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blogSlice";
import categoryReducer from "../features/categorySlice";
import buildingReducer from "../features/categorySlice";


export const store = configureStore({
  reducer: {
    blog: blogReducer,
    category: categoryReducer,
    building: buildingReducer,
  },
});


