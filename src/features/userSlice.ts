import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile, userLogin } from "./userActions";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// initialize userToken from local storage
const accessToken = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null;
const refreshToken = localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : null;

interface UserState {
  // loading: "idle" | "pending" | "succeeded" | "failed";
  loading: boolean;
  userInfo: null | userInfoType;
  accessToken: string | null;
  refreshToken: string | null;
  error: null | string;
  success: boolean;
}

type userInfoType = {
  id: number;
  nickname: string;
  profileImage: string;
  headline: string;
  badge: string;
  tags: {
    foodStyle: Array<string>;
    occupation: Array<string>;
    household: Array<string>;
  };
  isNotifiable: boolean;
  isMarketing: boolean;
  productBookmarkCount: number;
  reviewBookmarkCount: number;
  followerCount: number;
  followingCount: number;
  reviewCount: number;
  remainingPeriod: number;
  created: string;
};

const initialState = {
  loading: false,
  userInfo: null,
  accessToken,
  refreshToken,
  error: null,
  success: false
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.loading = false;
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.userInfo = payload;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload as userInfoType;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout } = userSlice.actions;

export const selectAccessToken = (state: { user: UserState }) => state.user.accessToken;
export const selectRefreshToken = (state: { user: UserState }) => state.user.refreshToken;

export default userSlice.reducer;
