import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import newsApi, {
  GetCategoryNewsTypes,
  GetOptionsNewsTypes,
} from "../apis/api/news";

export const getNews = createAsyncThunk(
  "/everything?q=",
  async (
    { searchKeyword, sortBy, pageSize, page }: GetOptionsNewsTypes,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await newsApi.getOptionsNews({
        searchKeyword,
        sortBy,
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

export const getCategoryNews = createAsyncThunk(
  "/top-headlines?category=",
  async (
    { category, pageSize, page, searchKeyword }: GetCategoryNewsTypes,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await newsApi.getCategoryNews({
        category,
        pageSize,
        page,
        searchKeyword,
      });
      console.log(data.articles);
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
