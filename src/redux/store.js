import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './slices/authSlice';

// Create a proper in-memory storage with Promise-based API
const createInMemoryStorage = () => {
  const storage = {};
  
  return {
    getItem: (key) => {
      return Promise.resolve(storage[key] || null);
    },
    setItem: (key, value) => {
      storage[key] = value;
      return Promise.resolve(value);
    },
    removeItem: (key) => {
      delete storage[key];
      return Promise.resolve();
    }
  };
};

const inMemoryStorage = createInMemoryStorage();

// Configuration for persistReducer
const persistConfig = {
  key: 'root',
  storage: inMemoryStorage,
  // Only persist the auth reducer
  whitelist: ['auth']
};

// Combine the reducers into a single reducer function
const rootReducer = combineReducers({
  auth: authReducer
  // Add other reducers here if needed
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register'], // Add other non-serializable paths if needed
      },
    }),
});

export const persistor = persistStore(store);