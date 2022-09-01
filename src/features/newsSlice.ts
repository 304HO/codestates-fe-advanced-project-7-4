import { createSlice } from "@reduxjs/toolkit";
import { getNews } from "./newsActions";

export type NewsType = {
  source: {
    id: null | string;
    name: string;
  };
  author: null | string;
  title: null | string;
  description: null | string;
  url: null | string;
  urlToImage: null | string;
  publishedAt: null | string;
  content: null | string;
};

export type NewsState = {
  loading: boolean;
  newsList: Array<NewsType>;
  error: null | string;
};

const initialState: NewsState = {
  loading: false,
  newsList: [],
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsList: (state) => {
      state.loading = false;
      state.newsList = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getNews.fulfilled,
        (state, { payload }: { payload: Array<NewsType> }) => {
          state.loading = false;
          state.newsList = [...state.newsList, ...payload];
        }
      )
      .addCase(getNews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { clearNewsList } = newsSlice.actions;

export const selectNewsList = (state: { news: NewsState }) =>
  state.news.newsList;

export default newsSlice.reducer;
