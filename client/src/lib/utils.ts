import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { BatteryFull, CircleGauge, MapPin, ShieldCheck } from "lucide-react";
import { TelemetryData, VehicleSummaryItem } from "@/types/interface";
import { TableColumnDefs, VehicleStatusPercentages } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// this function will aggregate and return the object
function aggregateData(data: { [key: string]: TelemetryData } | TelemetryData) {
  const {
    totalSpeed,
    totalBattery,
    totalDistance,
    normalHealthCount,
    errorHealthCount,
  } = Object.values(data).reduce(
    (acc, { speed, battery, distanceTraveled, vehicleHealth }) => {
      acc.totalSpeed += speed;
      acc.totalBattery += battery;
      acc.totalDistance += distanceTraveled;
      if (vehicleHealth === "normal") acc.normalHealthCount++;
      if (vehicleHealth === "error") acc.errorHealthCount++;
      return acc;
    },
    {
      totalSpeed: 0,
      totalBattery: 0,
      totalDistance: 0,
      normalHealthCount: 0,
      errorHealthCount: 0,
    }
  );

  const vehicleCount = Object.keys(data).length;
  return {
    avgSpeed: (totalSpeed / vehicleCount).toFixed(2),
    avgBattery: (totalBattery / vehicleCount).toFixed(2),
    totalDistance: totalDistance.toFixed(2),
    normalHealthCount,
    errorHealthCount,
  };
}

// getting stats for all the vehicles
export function getStatisticsOfAllVehicles(
  vehicleData: { [key: string]: TelemetryData } | TelemetryData
): VehicleSummaryItem[] {
  const summaryData = aggregateData(vehicleData);
  const vehicleStatistics = [
    {
      label: "Avg Speed",
      value: `${summaryData.avgSpeed} km/h`,
      icon: CircleGauge,
      color: `${
        Number(summaryData.avgBattery) > 100 ? "text-red-500" : "text-green-500"
      }`,
    },
    {
      label: "Avg Battery",
      value: `${summaryData.avgBattery} %`,
      icon: BatteryFull,
      color: `${
        Number(summaryData.avgBattery) < 50 ? "text-red-500" : "text-green-500"
      }`,
    },
    {
      label: "Total Distance",
      value: `${summaryData.totalDistance} km`,
      icon: MapPin,
      color: "text-muted-foreground",
    },
    {
      label: "Normal Health",
      value: summaryData.normalHealthCount,
      icon: ShieldCheck,
      color: "text-muted-foreground",
    },
  ];
  return vehicleStatistics;
}

// function to get table data
export function getTableData(
  vehicleData: TelemetryData | { [key: string]: TelemetryData }
): TableColumnDefs[] {
  return Object.values(vehicleData).map((vehicle) => ({
    vehicleId: vehicle.vehicleId,
    speed: vehicle.speed,
    battery: vehicle.battery,
    distanceTraveled: vehicle.distanceTraveled,
    vehicleHealth: vehicle.vehicleHealth,
    status: vehicle.status
  }));
}

// formatting the numbe with unit
export function formatNumberWithUnit(value: number, unit: string) {
  return `${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${unit}`;
}

export function getVehicleStatusInPercentages(vehicleData: { [key: string]: TelemetryData } | TelemetryData): VehicleStatusPercentages {
  const { active, idle, maintenance, total } = Object.values(vehicleData).reduce(
    (acc, record) => {
      if (record.status === 'active') acc.active++;
      else if (record.status === 'idle') acc.idle++;
      else if (record.status === 'maintenance') acc.maintenance++;

      acc.total++;

      return acc;
    },
    { active: 0, idle: 0, maintenance: 0, total: 0 }
  );

  // calculating percentages
  const activePercentage = total > 0 ? ((active / total) * 100).toFixed(2) : 0;
  const idlePercentage = total > 0 ? ((idle / total) * 100).toFixed(2) : 0;
  const maintenancePercentage = total > 0 ? ((maintenance / total) * 100).toFixed(2) : 0;

  return [activePercentage, idlePercentage, maintenancePercentage];
}