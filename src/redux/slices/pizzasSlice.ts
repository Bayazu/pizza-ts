import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type TPizza = {
  id: number;
  sizes: number[];
  price: number;
  title: string;
  types: number[];
  imageUrl: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = " success",
  ERROR = "error",
}

interface IPizzaSlice {
  items: TPizza[];
  status: Status;
}

const initialState: IPizzaSlice = {
  items: [],
  status: Status.LOADING,
};

type TFetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk<TPizza[], TFetchPizzasArgs>(
  "pizzas/getData",
  async (params) => {
    const { category, currentPage, sort } = params;
    const { data } = await axios.get<TPizza[]>(
      `https://62b7f8e3f4cb8d63df570826.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc`
    );
    return data;
  }
);

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  //extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
