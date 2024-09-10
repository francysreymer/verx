import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import HttpStatus from "http-status-codes";

type CropType = "Soja" | "Milho" | "Algodão" | "Café" | "Cana de Açúcar";

type Farm = {
  id: string;
  document: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  total_area: number;
  cultivable_area: number;
  vegetation_area: number;
  crops: CropType[];
};

interface FarmsState {
  farms: Farm[];
  loading: boolean;
  error: string | null;
}

const initialState: FarmsState = {
  farms: [],
  loading: false,
  error: null,
};

export const fetchFarms = createAsyncThunk("farms/fetchFarms", async () => {
  const response = await fetch("http://localhost:3002/api/farms");
  const data = await response.json();
  if (response.status === HttpStatus.OK) {
    return data;
  } else {
    throw new Error(data.message || "Failed to fetch farms.");
  }
});

export const deleteFarm = createAsyncThunk(
  "farms/deleteFarm",
  async (id: string) => {
    const response = await fetch(`http://localhost:3002/api/farms/${id}`, {
      method: "DELETE",
    });
    if (response.status === HttpStatus.NO_CONTENT) {
      return id;
    } else {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete farm.");
    }
  }
);

const farmsSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarms.fulfilled, (state, action: PayloadAction<Farm[]>) => {
        state.loading = false;
        state.farms = action.payload;
      })
      .addCase(fetchFarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch farms.";
      })
      .addCase(deleteFarm.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteFarm.fulfilled, (state, action: PayloadAction<string>) => {
        state.farms = state.farms.filter((farm) => farm.id !== action.payload);
      })
      .addCase(deleteFarm.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete farm.";
      });
  },
});

const store = configureStore({
  reducer: {
    farms: farmsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
