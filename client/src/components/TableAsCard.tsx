import { TableAsCardProps } from "@/types/interface";
import { TableColumnDefs } from "@/types/types";

import { formatNumberWithUnit } from "@/lib/utils";

export default function TableAsCard<TData extends TableColumnDefs>({
  data,
  onRowClick,
}: TableAsCardProps<TData>) {
  const handleRowClick = (item: TData) => () => {
    if (onRowClick) {
      onRowClick(item);
    }
  };
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border bg-card text-card-foreground shadow cursor-pointer"
          onClick={handleRowClick(item)}
        >
          <div className="flex flex-col p-4 pb-2">
            <div className="font-semibold leading-none tracking-tight">
              {item.vehicleId}
            </div>
            <div
             className={`text-sm capitalize pt-1 text-[var(--status-${item.status})]`}
            >
              {item.status}
            </div>
          </div>
          <div className="p-4 pb-2 pt-0 grid gap-6">
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <p className="relative flex shrink-0 text-sm font-semibold">
                  Battery:
                </p>
                <p className="text-sm font-medium leading-none pl-2">
                  { formatNumberWithUnit(item.battery as number, '%') }
                </p>
              </div>
              <div className="flex items-center mt-2 mb-2">
                <p className="relative flex shrink-0 text-sm font-semibold">
                  Speed:
                </p>
                <p className="text-sm font-medium leading-none pl-2">{ formatNumberWithUnit(item.speed as number, "km/h") }</p>
              </div>
              <div className="flex items-center">
                <p className="relative flex shrink-0 text-sm font-semibold">
                  Distance Travelled:
                </p>
                <p className="text-sm font-medium leading-none pl-2">
                { formatNumberWithUnit(item.distanceTraveled as number, "km") }
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
