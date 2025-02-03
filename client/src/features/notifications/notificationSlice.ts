import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Notifications } from "@/types/types";
import { AppNotification } from "@/types/interface";

// initial state
const initialState: Notifications = {
  messages: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      // finding the index, so that we will not push so many messages
      const existingIndex = state.messages.findIndex(
        (msg) => msg.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // replacing the existing message, if id is already present
        state.messages[existingIndex] = action.payload;
      } else {
        state.messages.push(action.payload);
      }
    },
    clearNotifications: (state) => {
      state.messages = [];
    },
  },
});
export const { addNotification, clearNotifications } =
  notificationSlice.actions;
export const selectNotifications = (state: { notification: Notifications }) =>
  state.notification.messages;
export default notificationSlice.reducer;
