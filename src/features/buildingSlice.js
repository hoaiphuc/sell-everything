import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getBuildings, createBuilding, deleteBuilding } from '../services/building.service';

const initialState = { 
  buildings: [],
  status: 'idle',
  error: null,
};

export const fetchBuildings = createAsyncThunk('buildings/fetchBuildings', async () => {
  const buildings = await getBuildings();
  return buildings;
});

export const addBuilding = createAsyncThunk('buildings/addBuilding', async (building) => {
  console.log("newbuilding: ", building)
  const newbuilding = await createBuilding(building);
  return newbuilding;
});

export const removeBuilding = createAsyncThunk('buildings/removeBuilding', async (id) => {
  await deleteBuilding(id);
  return id;
});

const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buildings = action.payload;
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBuilding.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBuilding.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buildings.push(action.payload);
      })
      .addCase(addBuilding.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeBuilding.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeBuilding.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buildings = state.buildings.filter((building) => building.id !== action.payload);
      })
      .addCase(removeBuilding.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default buildingsSlice.reducer;

export const selectAllBuilding = createSelector(
  (state) => state.building.buildings,
  (buildings) => {
    if (Array.isArray(buildings)) {
      return buildings;
    }
    return [];
  }
);

