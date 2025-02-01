import { AppNotification, TelemetryData } from "@/types/interface";

export type Notifications = {
  messages: AppNotification[];
};

export type tableColumnDefs = Pick<TelemetryData, "vehicleId" | "speed" | "battery" | "distanceTraveled" | "vehicleHealth">;
