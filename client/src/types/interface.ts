export interface ThemeState {
  theme: string;
}

export interface AppNotification {
  message: string;
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
}

export interface VehicleSummaryItem {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}