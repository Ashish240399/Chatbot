import { configureStore } from "@reduxjs/toolkit";
import conversationSlice from "../Slice/coversationSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
