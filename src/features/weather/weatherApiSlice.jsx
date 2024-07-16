import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import weather from "../../weather";

export const featchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    console.log("=========================================================");
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=25.38&lon=49.57&appid=e270c4af5bf8653bfbcb5c1777ab1735",
      {
        // cancelToken: new axios.CancelToken((c) => {
        //   cancelAxios = c;
        // }),
      }
    );

    // handle success
    const responsTemp = Math.round(response.data.main.temp - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const description = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;
    console.log(response);
    // setTemp({
    //   number: responsTemp,
    //   description: description,
    //   min: min,
    //   max: max,
    //   icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    // });
    return {
      number: responsTemp,
      max,
      min,
      description,
      icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    };
  }
);
const weatherApiSlice = createSlice({
  name: "weatherApi",

  initialState: {
    result: "empyt",
    weather: {},
    isLoding: false,
  },

  reducers: {
    changeResult: (state, action) => {
      state.result = "change";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(featchWeather.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(featchWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.isLoding = false;
      })
      .addCase(featchWeather.rejected, (state, action) => {
        state.isLoding = true;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
