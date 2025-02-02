import { useEffect } from "react";

import useNetworkStatus from "@/hooks/useNetworkStatus";
import useIndexedDB from "@/hooks/useIndexedDB";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

import { useSubscribeToTelemetryDataQuery } from "@/features/websocket";

import { TelemetryData } from "@/types/interface";

export default function Footer() {
  // hook to check if user is online or offline
  const isOnline = useNetworkStatus();
  // hook for indexeddb
  const { saveToIndexedDB } = useIndexedDB();

  //hook to show toast
  const { toast } = useToast();

  // taking data from the subscribed hook
  const { data: vehicleData = {} } = useSubscribeToTelemetryDataQuery<{
    [vehicleId: string]: TelemetryData;
  }>({});

  // translation hook
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOnline && vehicleData && Object.keys(vehicleData).length > 0) {
      const saveData = async () => {
        try {
          await saveToIndexedDB(vehicleData);
          console.log("Data saved successfully to IndexedDB");
        } catch (error) {
          console.error("Error saving data to IndexedDB", error);
        }
      };

      saveData();
    }
  }, [isOnline, saveToIndexedDB, vehicleData]);

  useEffect(() => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: t("offlineTitle"),
        description: t("offlineMessage"),
      });
    }
  }, [isOnline, toast, t]);

  return (
    <footer className="h-8 flex items-center justify-center">
      {!isOnline ? (
        <p className="text-lg font-bold text-[var(--foreground)]">
          You are offline!
        </p>
      ) : null}
    </footer>
  );
}
