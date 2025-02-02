import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { TableColumnDefs } from "@/types/types";
import { formatNumberWithUnit } from "@/lib/utils";

import { Button } from "@/components/ui/button";

// don't move it to util because we are reurning html tag
const formatHealthStatus = (value: string) => {
return (
    <span className={`text-sm capitalize pt-1 text-[var(--status-${value})]`}>
      {value}
    </span>
  );
};

export const columns: ColumnDef<TableColumnDefs>[] = [
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
          className="pl-0"
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
          className="pl-0"
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
    accessorKey: "status",
    header: "Vehicle Status",
    cell: ({ getValue }) => formatHealthStatus(getValue() as string),
    enableGlobalFilter: false,
  },
];
