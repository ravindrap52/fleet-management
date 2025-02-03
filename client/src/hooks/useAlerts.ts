import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { ALERT_CONFIG } from "@/lib/config";
import { TelemetryData } from "@/types/interface";

import { useToast } from "@/hooks/use-toast";

import { addNotification } from "@/features/notifications/notificationSlice";

export default function useAlerts(
  vehicles:
    | TelemetryData
    | {
        [key: string]: TelemetryData;
      }
) {
  // rtk dispatch hook
  const dispatch = useDispatch();

  // translation hook
  const { t } = useTranslation();

  //hook to show toast
  const { toast } = useToast();
  
  useEffect(() => {
    if (!vehicles || Object.keys(vehicles).length === 0) return;
    // taking only first 5
    Object.values(vehicles)
      .slice(0, 5)
      .forEach((vehicle: TelemetryData) => {
        const { vehicleId } = vehicle;

        Object.entries(ALERT_CONFIG).forEach(([key, config]) => {
          const typedKey = key as keyof TelemetryData;
          // taking value form the vehicle like Battery etc
          const value = vehicle[typedKey];
        
          if (value === undefined || value === null) return;

          // localizing message
          const translatedMessage = t(config.message);

          // dispatching an action
          if (
            config.threshold !== undefined &&
            Number(value) < config.threshold
          ) {
            dispatch(
              addNotification({
                id: `${key}-${vehicleId}`,
                type: config.type,
                message: `Vehicle ${vehicleId}: ${translatedMessage} (${Number(
                  value
                ).toFixed(2)}${config.symbol || ""})`,
                timeStamp: new Date().toISOString(),
              })
            );
          }

          if (
            config.errorValues &&
            config.errorValues.includes(value.toString())
          ) {
            dispatch(
              addNotification({
                id: `${key}-${vehicleId}`,
                type: config.type,
                message: `Vehicle ${vehicleId}: ${translatedMessage} (Status: ${value})`,
                timeStamp: new Date().toISOString(),
              })
            );
            toast({
              variant: "destructive",
              description: `Vehicle ${vehicleId}: ${translatedMessage} (Status: ${value})`,
            });
          }
        });
      });
  }, [vehicles, dispatch, t, toast]);
}
