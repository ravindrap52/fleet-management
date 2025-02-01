import { io } from "socket.io-client";
import { createApi } from "@reduxjs/toolkit/query/react";

import { TelemetryData } from "@/types/interface";

// Initialize socket connection
const socket = io("ws://127.0.0.1:3001");

export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: async () => ({ data: {} }),
  endpoints: (builder) => ({
    // subscribing to telemetry data
    subscribeToTelemetryData: builder.query({
      queryFn: async () => {
        return { data: {} as { [key: string]: TelemetryData } };
      },
      // onCacheEntryAdded lifecycle to manage the socket connection
      onCacheEntryAdded: async (
        _arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) => {
        // Wait until the query is successfully added to the cache
        await cacheDataLoaded;

        // listening for telemetry updates
        socket.on("telemetryUpdate", (vehicleData: { [key: string]: TelemetryData }) => {
          updateCachedData((draft) => {
            Object.assign(draft, vehicleData); 
          });
        });

        // handling socket errors
        socket.on("connect_error", (error) => {
          console.error("Socket.IO connection error:", error);
        });

        // Cleanup when the cache entry is removed (e.g., component unmount)
        await cacheEntryRemoved;

        socket.off("telemetryUpdate");
        socket.off("connect_error");
      },
    }),
  }),
});

export const { useSubscribeToTelemetryDataQuery } = vehicleApi;
