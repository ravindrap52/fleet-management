import { AlertsConfig, TelemetryData } from "@/types/interface";

export const ALERT_CONFIG: Record<keyof Pick<TelemetryData, "battery" | "temperature" | "vehicleHealth">, AlertsConfig> = {
  battery: { threshold: 20, message: "lowBattery", type: "critical", symbol: "%" },
  temperature: { threshold: 35, message: "highTemperature", type: "warning", symbol: "°C" },
  vehicleHealth: {
    errorValues: ["error"],
    message: "vehicleHealthIssue",
    type: "error",
  },
};
