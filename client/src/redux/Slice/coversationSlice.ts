import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

const initialState = {
  value: [] as Conversation[],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
