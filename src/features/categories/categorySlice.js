import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("authToken"));

const initialState = {
  category: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCategories = createAsyncThunk(
  ("category/getAll",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories(token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  })
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
