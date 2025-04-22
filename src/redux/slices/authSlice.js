// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../Services/authInterceptor';

// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         '/api/auth/login/',
//         { email, password },
//         { withCredentials: true }
//       );
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Login failed');
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         '/api/auth/register/',
//         userData,
//         { withCredentials: true }
//       );
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Registration failed');
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axios.post('/api/auth/logout/', {}, { withCredentials: true });
//       return true;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Logout failed');
//     }
//   }
// );

// export const fetchUser = createAsyncThunk(
//   'auth/fetchUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('/api/auth/me/', { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch user');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Logout
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Fetch User
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;







// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Services/authInterceptor';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/auth/login/',
        { email, password }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/auth/register/',
        userData
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/auth/logout/');
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/auth/me/');
      return response.data;
    } catch (error) {
      // Don't show error message for auth check during initial load
      if (error.response?.status === 401) {
        return rejectWithValue(null);
      }
      return rejectWithValue(error.response?.data || 'Failed to fetch user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true, // Start with loading true for initial auth check
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        // Only set error if it's not an initial auth check failure
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;