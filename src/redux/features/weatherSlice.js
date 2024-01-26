import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getinitialWheatherData = createAsyncThunk(
  "get_initialwheatherdata",
  async (city_name) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=ffd502189b7cc9ed3f22d5ca0313b9ac&units=metric`
      );
      await new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, 1000);
      });
      return res;
    } catch (error) {
      // console.log(error);
      return error.response.data;
    }
  }
);

export const wheatherMoreInfo = createAsyncThunk(
  "wheatherMoreInfo",
  async (city_name) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=ffd502189b7cc9ed3f22d5ca0313b9ac&units=metric`
      );

      return res;
    } catch (error) {
      // console.log(error);
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
    currentMoreInfo: {},
  },
  update: false,
};

const wheatherSlice = createSlice({
  name: "wheatherSlice",
  initialState: initialState,
  reducers: {
    clearLocation: (state, payload) => {
      state.data.locations = [];
    },
    setUpdate: (state, payload) => {
      state.update = !state.update;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getinitialWheatherData.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getinitialWheatherData.fulfilled, (state, { payload }) => {
        state.loading = false;
        switch (payload.status) {
          case 200:
            state.data.locations.push(payload.data);
          default:
            if (payload.cod == 401) {
              state.isError = true;
              state.errorData.message = payload.message;
            }
        }
      })
      .addCase(getinitialWheatherData.rejected, (state, payload) => {
        state.loading = false;
        state.isError = true;
        state.errorData.message = payload.message;
      })
      // wheatherMoreInfo
      .addCase(wheatherMoreInfo.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(wheatherMoreInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        switch (payload.status) {
          case 200:
            state.data.currentMoreInfo = payload.data;
          default:
            if (payload.cod == 401) {
              state.isError = true;
              state.errorData.message = payload.message;
            }
        }
      })
      .addCase(wheatherMoreInfo.rejected, (state, payload) => {
        state.loading = false;
        state.isError = true;
        state.errorData.message = payload.message;
      });
  },
});

export default wheatherSlice.reducer;
export const { clearLocation, setUpdate } = wheatherSlice.actions;
