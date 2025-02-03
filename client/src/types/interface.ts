import { ColumnDef } from "@tanstack/react-table";

export interface ThemeState {
  theme: string;
}

export interface AppNotification {
  message: string;
  id: string;
  type: "info" | "warning" | "critical" | "error";
  timeStamp: string;
}

export interface TelemetryData {
  vehicleId: string;
  speed: number;
  battery: number;
  lat: number;
  lan: number;
  temperature: number;
  tirePressure: number;
  engineEfficiency: number;
  motorPower: number;
  regenBraking: boolean;
  distanceTraveled: number;
  vehicleHealth: string;
  timestamp: string;
  timeSinceLastMaintenance: number;
  energyConsumption: number;
  distanceToNextChargingStation: number;
  status: string;
  batteryHealth: number;
}

export interface VehicleSummaryItem {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

export interface VehicleDetailsProps {
  vehicleId: string;
  isDialogOpen: boolean;
  setIsDialogOpen:(open: boolean) => void;
  vehicles: TelemetryData | { [key: string]: TelemetryData }
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (rowData: TData) => void;
}

export interface TableAsCardProps<TData> {
  data: TData[];
  onRowClick?: (rowData: TData) => void;
}

export interface AlertsConfig {
  threshold?: number;
  errorValues?: string[];
  message: string;
  type: "info" | "warning" | "critical" | "error";
  symbol?: string;
}