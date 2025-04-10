import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/theme/themeSlice";
import notificationsReducer from "@/features/notifications/notificationSlice";
import { vehicleApi } from "@/features/websocket";

export const store = configureStore({
  reducer: {
    appTheme: themeReducer,
    notifications: notificationsReducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vehicleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
