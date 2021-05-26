import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendData } from "./finThunk";
import { DataInputs } from "./types";

type FinState = {
  status: "loading" | "idle";
  error: string | null;
  finData: DataInputs;
};

const initialState = {
  finData: {
    price: 0,
    quantity: 0,
    sum: 0,
  },
  error: null,
  status: "idle",
} as FinState;

export const finandySlice = createSlice({
  name: "finandy",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setValues: (state, action: PayloadAction<DataInputs>) => {
      state.finData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendData.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(sendData.fulfilled, (state, { payload }) => {
      console.log("reducer", payload);
      state.finData = payload;
      state.status = "idle";
    });

    builder.addCase(sendData.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});

export const { setValues } = finandySlice.actions;

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectFinandy = (state) => state.finandy;

export default finandySlice.reducer;
