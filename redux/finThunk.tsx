import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataInputs } from "./types";

// login request
export const sendData = createAsyncThunk<
DataInputs,
DataInputs,
{ rejectValue: any }
>(
  "auth/login/request",
  async (dataInputs, thunkApi) => {
    const response = await fetch(`http://localhost:3000/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "291",
          Accept: "*/*",
        },
        body: JSON.stringify(dataInputs),
      });

    const resData = await response.json();
    console.log("status===>", response.status);
    if (response.status >= 400 && response.status < 500) {
      // Return the known error for future handling
      return thunkApi.rejectWithValue(resData.message);
    }

    if (response.status >= 500) {
      // Return the known error for future handling
      return thunkApi.rejectWithValue("something went wrong with server");
    }
    return resData as DataInputs;
  }
);
