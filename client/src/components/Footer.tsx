import { useEffect } from "react";

import useNetworkStatus from "@/hooks/useNetworkStatus";
import useIndexedDB from "@/hooks/useIndexedDB";
import { useSubscribeToTelemetryDataQuery } from "@/features/websocket";
import { TelemetryData } from "@/types/interface";

export default function Footer() {
  const isOnline = useNetworkStatus();
  const { saveToIndexedDB } = useIndexedDB();
  const { data : vehicleData = {}} = useSubscribeToTelemetryDataQuery<{
    [vehicleId: string]: TelemetryData;
  }>({});

  useEffect(() => {
    if (!isOnline && vehicleData && Object.keys(vehicleData).length > 0) {
      // Use async function to wait for saving to IndexedDB to complete
      const saveData = async () => {
        try {
          await saveToIndexedDB(vehicleData); // Wait for the operation to complete
          console.log("Data saved successfully to IndexedDB");
        } catch (error) {
          console.error("Error saving data to IndexedDB", error);
        }
      };

      saveData(); // Call async function to save data
    }
  }, [isOnline, saveToIndexedDB, vehicleData]);
  return (
    <footer className="h-8 flex items-center justify-center">
      {isOnline ? (
        <p className="text-lg font-bold text-[var(--foreground)]">
          You are online!
        </p>
      ) : (
        <p className="text-lg font-bold text-[var(--foreground)]">
          You are offline!
        </p>
      )}
    </footer>
  );
}
