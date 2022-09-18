import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsType } from "./newsSlice";
import { userLogin } from "./userActions";
import { changeUrl } from "../common/utils/parseUrl";

interface UserState {
  loading: boolean;
  isLogin: boolean;
  // bookmarkList: Array<NewsType>;
  bookmarkList: { [x: string]: NewsType };
  error: null | string;
}

const initialState: UserState = {
  loading: false,
  isLogin: false,
  bookmarkList: {},
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.isLogin = false;
      state.error = null;
    },

    initialBookmark: (state) => {
      state.bookmarkList = {};
    },
    // deleteBookmarkIndex: (state, action: PayloadAction<number>) => {
    deleteBookmarkIndex: (state, action: PayloadAction<string>) => {
      // state.bookmarkList.splice(action.payload, 1);
      delete state.bookmarkList[changeUrl(action.payload)];
    },
    addBookmark: (state, action: PayloadAction<NewsType>) => {
      if (
        action.payload !== null &&
        action.payload !== undefined &&
        action.payload.url !== null
      ) {
        state.bookmarkList[changeUrl(action.payload.url)] = action.payload;
      }
    },
    editBookmark: (
      state,
      action: PayloadAction<{ url: string; news: NewsType }>,
    ) => {
      state.bookmarkList[changeUrl(action.payload.url)] = action.payload.news;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.loading = false;
        state.isLogin = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.isLogin = false;
        state.error = payload as string;
      });
  },
});

export const {
  logout,
  initialBookmark,
  deleteBookmarkIndex,
  addBookmark,
  editBookmark,
} = userSlice.actions;

export const selectBookmarkList = (state: { user: UserState }) =>
  state.user.bookmarkList;
export const selectIsLogin = (state: { user: UserState }) => state.user.isLogin;

export default userSlice.reducer;
