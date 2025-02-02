import { AppNotification, TelemetryData } from "@/types/interface";

export type Notifications = {
  messages: AppNotification[];
};

export type TableColumnDefs = Pick<TelemetryData, "vehicleId" | "speed" | "battery" | "distanceTraveled" | "vehicleHealth" | "status">;
