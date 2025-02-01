import { createSlice } from "@reduxjs/toolkit";

import { Notifications } from "@/types/types";

// initial state
const initialState: Notifications = {
  messages: [
    {
      message: "Vehicle 123, has high temperature",
    },
    {
      message: "Vehicle 456, has critical battery",
    },
  ],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    
  },
});
export const selectNotifications = (state: { notification: Notifications }) => state.notification.messages;