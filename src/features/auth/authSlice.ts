import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../client";
import axios from "axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  isActive: boolean;
  enrollments: string[];
}

interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...initialState,
        user: null,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
      // state.user = null;
      // state.isAuthenticated = false;
      // state.access = null;
      // state.refresh = null;
      // localStorage.removeItem("access");
      // localStorage.removeItem("refresh");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuthenticated.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthenticated.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkAuthenticated.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(load_user.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(load_user.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(load_user.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem("access", action.payload.access);
          localStorage.setItem("refresh", action.payload.access);
          state.access = action.payload.access;
          state.refresh = action.payload.refresh;
          state.isAuthenticated = true;
        }
      });
  },
});

interface Response {
  access: string;
  refresh: string;
}

export const checkAuthenticated = createAsyncThunk("auth/check", async () => {
  try {
    const res = await client.post("/auth/jwt/verify/", {
      token: localStorage.getItem("access"),
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await client.post<Response>("/auth/jwt/create/", {
        email,
        password,
      });
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return Promise.reject(e.response?.data.detail);
      } else {
        return Promise.reject("Network error. Please check your connection");
      }
    }
  }
);

// export const googleLogin = createAsyncThunk(
//   "auth/google/login",
//   async ({ code, redirect_uri }: { code: string; redirect_uri: string }) => {
//     try {
//       const res = await client.post<Response>("/auth/oauth/token/", {
//         code,
//         redirect_uri,
//       });
//       return res.data;
//     } catch (e) {
//       if (axios.isAxiosError(e)) {
//         return Promise.reject(e.response?.data.detail);
//       }
//     }
//   }
// );

export const load_user = createAsyncThunk("auth/load_user", async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  };
  try {
    const res = await client.get<User>("/auth/users/me/", config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return Promise.reject(e.response?.data.detail);
    }
  }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
