import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  categoryId: 0,
  pagination: {
    currentPage: 1,
  },
  sort: {
    name: "популярности",
    sort: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setPage(state, action) {
      state.pagination = {
        currentPage: action.payload,
      };
    },
    setFilters(state, action) {
      console.log(action);
      state.pagination.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const selectSort = (state) => state.filter.sort;
export const selectFilter = (state) => state.filter;

export const {
  setCategoryId,
  setSortType,
  setPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
