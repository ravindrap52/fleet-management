import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TelemetryData, VehicleDetailsProps } from "@/types/interface";
import { formatNumberWithUnit } from "@/lib/utils";
import PopupMap from "@/components/Map";

export default function VehicleDetails({
  vehicleId,
  isDialogOpen,
  setIsDialogOpen,
  vehicles,
}: VehicleDetailsProps) {
  const [vehicle] = Object.values(vehicles).filter(
    (vehicle: TelemetryData) => vehicle.vehicleId === vehicleId
  );

  // This is for map
  const filteredVehicle = {
    [vehicleId]: vehicle,
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        className="sm:max-w-[425px] lg:max-w-[900px] max-w-full w-full
           p-4 bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--border)]
           rounded-[var(--radius)] shadow-[var(--box-shadow)]"
      >
        <DialogHeader>
          <DialogTitle className="text-[var(--foreground)]">
            <span className="capitalize text-primary-foreground">
              {vehicle.vehicleId}
            </span>
            <span
              className={`pl-3 capitalize text-[var(--status-${vehicle.status})]`}
            >
              ({vehicle.status})
            </span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
          {/* Vehicle Information */}
          <div className="pb-2 pt-0 grid gap-4 sm:gap-6 w-full">
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="relative flex shrink-0 text-sm font-semibold">
                  Battery:
                </p>
                <p className="text-sm font-medium leading-none pl-2">
                  {formatNumberWithUnit(vehicle.battery as number, "%")}
                </p>
              </div>
              <div className="flex items-center mt-2 mb-2">
                <p className="relative flex shrink-0 text-sm font-semibold">
                  Speed:
                </p>
                <p className="text-sm font-medium leading-none pl-2">
                  {formatNumberWithUnit(vehicle.speed as number, "km/h")}
                </p>
              </div>
              <div className="flex items-center">
                <p className="relative flex shrink-0 text-sm font-semibold">
                  Distance Travelled:
                </p>
                <p className="text-sm font-medium leading-none pl-2">
                  {formatNumberWithUnit(
                    vehicle.distanceTraveled as number,
                    "km"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full h-[500px]">
            <PopupMap vehicles={filteredVehicle} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
