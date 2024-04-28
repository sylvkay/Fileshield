import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface User {
  username: string;
  token: string;
  email: string;
}

interface UserCredentials {
  password: string;
  email: string;
  username?: string;
}

interface InitialState {
  user: User | null;
  isSuccess: boolean;
  changePasswordError: any;
}

const initialState: InitialState = {
  user: null,
  isSuccess: false,
  changePasswordError: null,
};

export const SignUpUser = createAsyncThunk<User, UserCredentials>(
  "/auth/signup",
  async ({ username, password, email }) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/register",
      {
        username,
        password,
        email,
      }
    );
    return response.data;
  }
);

export const LoginUser = createAsyncThunk<User, UserCredentials>(
  "/auth/login",
  async ({ email, password }) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/signin/",
      {
        email,
        password,
      }
    );
    return response.data;
  }
);

export const ChangeUserPassword = createAsyncThunk(
  "auth/change-password",
  async ({ oldPassword, newPassword }: any, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.user?.token;
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/change-password/",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUpUser.pending, (state) => {
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(SignUpUser.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(SignUpUser.rejected, (state) => {
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(LoginUser.pending, (state) => {
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(ChangeUserPassword.pending, (state) => {
        state.changePasswordError = null;
      })
      .addCase(ChangeUserPassword.rejected, (state, action) => {
        state.changePasswordError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions; // If you want to export any reducers

export default authSlice.reducer;
