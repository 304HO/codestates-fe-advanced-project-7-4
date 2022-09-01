import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../apis/api/auth";

type loginTypes = { id: string; password: string };

export const userLogin = createAsyncThunk(
  "auth/login/",
  async ({ id, password }: loginTypes, { rejectWithValue }) => {
    try {
      const result = await authApi.login({ id, password });
      return result;
    } catch (error: any) {
      const { response, message, serverErrorMessage } = error;
      if (response && serverErrorMessage) {
        return rejectWithValue(serverErrorMessage);
      } else {
        return rejectWithValue(message);
      }
    }
  }
);
