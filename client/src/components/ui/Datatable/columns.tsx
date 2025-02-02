import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { tableColumnDefs } from "@/types/types";
import { formatNumberWithUnit } from "@/lib/utils";

import { Button } from "@/components/ui/button";

// don't move it to util because we are reurning html tag
const formatHealthStatus = (value: string) => {
  const statusClasses = value === "normal"
    ? "text-green-500 capitalize"
    : value === "error"
    ? "text-red-500 capitalize"
    : "text-gray-500";

  return (
    <span className={statusClasses}>
      {value}
    </span>
  );
};

export const columns: ColumnDef<tableColumnDefs>[] = [
  {
    accessorKey: "vehicleId",
    header: "Vehicle ID",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "battery",
    header: () => (
      <span>
        Battery <span style={{ fontSize: "0.75rem" }}>%</span>
      </span>
    ),
    cell: ({ getValue }) => formatNumberWithUnit(getValue() as number, '%'), 
    enableGlobalFilter: false,
  },
  {
    accessorKey: "distanceTraveled",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Distance <span style={{ fontSize: "0.75rem" }}>km</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => formatNumberWithUnit(getValue() as number, "km"),
  },
  {
    accessorKey: "speed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Speed <span style={{ fontSize: "0.75rem" }}>km/h</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => formatNumberWithUnit(getValue() as number, "km/h"),
  },
  {
    accessorKey: "vehicleHealth",
    header: "Health",
    cell: ({ getValue }) => formatHealthStatus(getValue() as string),
    enableGlobalFilter: false,
  },
];
