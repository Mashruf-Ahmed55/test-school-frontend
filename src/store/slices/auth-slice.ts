'use client';

import type { User } from '@/types/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | null;
  user: Pick<
    User,
    | 'id'
    | 'name'
    | 'email'
    | 'role'
    | 'isEmailVerified'
    | 'certificationLevel'
    | 'lastAssessmentDate'
    | 'assessmentAttempts'
  > | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
      }
    },
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setTokens, setUser, logout } = slice.actions;
export default slice.reducer;
