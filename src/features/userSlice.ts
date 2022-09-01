import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsType } from "./newsSlice";
import { userLogin } from "./userActions";

interface UserState {
  loading: boolean;
  isLogin: boolean;
  bookmarkList: Array<NewsType>;
  error: null | string;
}

const initialState: UserState = {
  loading: false,
  isLogin: false,
  bookmarkList: [],
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
      state.bookmarkList = [];
    },
    deleteBookmarkIndex: (state, action: PayloadAction<number>) => {
      state.bookmarkList.splice(action.payload, 1);
    },
    addBookmark: (state, action: PayloadAction<NewsType>) => {
      state.bookmarkList.push(action.payload);
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

export const { logout, initialBookmark, deleteBookmarkIndex, addBookmark } =
  userSlice.actions;

export const selectBookmarkList = (state: { user: UserState }) =>
  state.user.bookmarkList;
export const selectIsLogin = (state: { user: UserState }) => state.user.isLogin;

export default userSlice.reducer;
