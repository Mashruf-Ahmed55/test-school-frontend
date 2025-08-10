'use client';

import { configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import { api } from './services/api';
import authReducer from './slices/auth-slice';
import examReducer from './slices/exam-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exam: examReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppState = ReturnType<typeof store.getState>;
