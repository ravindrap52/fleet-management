import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { VehicleStatusPercentages } from "@/types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({vehicleData}: {vehicleData: VehicleStatusPercentages}) {
  const chartData = {
    labels: ["Active Vehicle", "Idle", "Maintenance"],
    datasets: [
      {
        data: vehicleData,
        backgroundColor: ["#10b981", "#f59e0b", "#fb923c"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="tracking-tight text-sm font-medium">Vehicle Status</div>
      </div>
      <div className="p-6 pt-0">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
