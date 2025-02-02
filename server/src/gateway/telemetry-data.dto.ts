export class TelemetryDataDTO {
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
  timeSinceLastMaintenance: number;
  energyConsumption: number;
  distanceToNextChargingStation: number;
  status: string;
  batteryHealth: number;
  vehicleHealth: string;
  timestamp: string;
}
