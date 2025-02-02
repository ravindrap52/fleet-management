import { VehicleSummaryItem } from "@/types/interface";

// card to display the data
export default function Card({ item }: { item: VehicleSummaryItem }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="tracking-tight text-sm font-medium">{item.label}</div>
        <item.icon className={`${item.color} h-6 w-6 `} />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{item.value}</div>
      </div>
    </div>
  );
}
