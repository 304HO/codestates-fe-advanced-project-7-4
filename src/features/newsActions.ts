import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import newsApi, { GetOptionsNewsTypes } from "../apis/api/news";

export const getNews = createAsyncThunk(
  "/everything?q=",
  async (
    { searchKeyword, sortedtype, pageSize, page }: GetOptionsNewsTypes,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await newsApi.getOptionsNews({
        searchKeyword,
        sortedtype,
        pageSize,
        page,
      });
      return data.articles;
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
