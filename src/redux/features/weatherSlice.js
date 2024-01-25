import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getinitialWheatherData = createAsyncThunk(
  "get_initialwheatherdata",
  async () => {
    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=19.0330&lon=73.0297&appid=2b21123e8dca1b4eab8743e5310e51d9&units=metric"
      );
      return res;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

const initialState = {
  loading: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  isError: false,
  data: {
    locations: [],
  },
};

const wheatherSlice = createSlice({
  name: "wheatherSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getinitialWheatherData.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getinitialWheatherData.fulfilled, (state, { payload }) => {});
  },
});

export default wheatherSlice.reducer;
// export const {} wheatherSlice.actions;
