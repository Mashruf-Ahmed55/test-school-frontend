"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ExamState = {
  activeSessionId: string | null
}

const initialState: ExamState = {
  activeSessionId: null,
}

const slice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<string | null>) {
      state.activeSessionId = action.payload
    },
  },
})

export const { setSession } = slice.actions
export default slice.reducer
