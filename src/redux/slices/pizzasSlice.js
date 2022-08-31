import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/getData",
  async (params, thunkAPI) => {
    const { category, currentPage, sort } = params;
    const { data } = await axios.get(
      `https://62b7f8e3f4cb8d63df570826.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc`
    );
    return data;
    //если будет ошибка, то передаст данные в action
    // if (data.length === 0) {
    //   return thunkAPI.rejectWithValue("Пиццы пустые");
    // }
    // return thunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  items: [],
  status: "loading",
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
