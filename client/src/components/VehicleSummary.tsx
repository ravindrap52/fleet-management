import { VehicleSummaryItem } from "@/types/interface";

import Card from "@/components/ui/card";

export default function VehicleSummary({
  vehicleSummaries,
}: {
  vehicleSummaries: VehicleSummaryItem[];
}) {
  return (
    <>
      {vehicleSummaries.map((item, index) => (
        <Card item={item} key={index} />
      ))}
    </>
  );
}
