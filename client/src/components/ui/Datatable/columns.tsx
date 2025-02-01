import { tableColumnDefs } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../button";

export const columns: ColumnDef<tableColumnDefs>[] = [
  {
    accessorKey: "vehicleId",
    header: "Vehicle ID",
  },
  {
    accessorKey: "battery",
    header: "Battery",
  },
  {
    accessorKey: "distanceTraveled",
    header: "Distance Travelled",
  },
  {
    accessorKey: "speed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Speed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "vehicleHealth",
    header: "Health",
  },
];
