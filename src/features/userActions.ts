import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../apis/api/auth";

export const userLogin = createAsyncThunk("auth/login/", async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const { data } = await authApi.login({ providerType: "email", email, password });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (error: any) {
    const { response, message, serverErrorMessage } = error;
    if (response && serverErrorMessage) {
      return rejectWithValue(serverErrorMessage);
    } else {
      return rejectWithValue(message);
    }
  }
});

export const getUserProfile = createAsyncThunk("user/", async (arg, { getState, rejectWithValue }: any) => {
  try {
    const { data } = await authApi.getProfile();
    return data;
  } catch (error: any) {
    const { response, message, serverErrorMessage } = error;
    // return custom error message from API if any
    if (response && serverErrorMessage) {
      return rejectWithValue(serverErrorMessage);
    } else {
      return rejectWithValue(message);
    }
  }
});
