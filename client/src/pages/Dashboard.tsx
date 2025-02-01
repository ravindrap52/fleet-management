import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/Datatable/dataTable";
import { columns } from "@/components/ui/Datatable/columns";
import Map from "@/components/Map";

import useNetworkStatus from "@/hooks/useNetworkStatus";
import useIndexedDB from "@/hooks/useIndexedDB";

import { useSubscribeToTelemetryDataQuery } from "@/features/websocket";

import { getStatisticsOfAllVehicles, getTableData } from "@/lib/utils";
import { TelemetryData, VehicleSummaryItem } from "@/types/interface";

export default function Dashboard() {
  const isOnline = useNetworkStatus();
  const { getDataFromIndexedDB } = useIndexedDB();
  
  const { isLoading, data: liveData, isError } = useSubscribeToTelemetryDataQuery<{
    [vehicleId: string]: TelemetryData;
  }>({});
  const [offlineData, setOfflineData] = useState<{ [key: string]: TelemetryData }>({});
  
  // Fetch data from IndexedDB when offline
  useEffect(() => {
    if (!isOnline) {
      const fetchData = async () => {
        const storedData = await getDataFromIndexedDB();
        if (storedData) {
          setOfflineData(storedData);
          console.log("Loaded offline data from IndexedDB:", storedData);
        }
      };
      fetchData();
    }
  }, [isOnline, getDataFromIndexedDB]);

  const vehicleData = isOnline ? liveData : offlineData;

  if (isLoading) {
    return <div>Loading telemetry data...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data!</div>;
  }

  if (!vehicleData || Object.keys(vehicleData).length === 0) {
    return <div>No vehicle data available.</div>;
  }

  // Prepare a summary for all vehicles
  const allVehicleSummaries: VehicleSummaryItem[] =
    getStatisticsOfAllVehicles(vehicleData);
    
  const tableData = getTableData(vehicleData);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {/* Display all vehicle summaries collectively */}
        {allVehicleSummaries.map((item, index) => (
          <Card
            key={index}
            className="bg-[var(--card-bg)] shadow-md rounded-lg p-4"
          >
            <CardContent className="flex items-center gap-4">
              <item.icon className={`${item.color} w-16 h-16`} />
              <div>
                <p className="text-sm text-[var(--foreground)]">{item.label}</p>
                <p className="text-lg font-bold text-[var(--foreground)]">
                  {item.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="tracking-tight text-sm font-medium">
              Total Revenue
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between pl-4 pr-4 gap-4">
        <div className="flex-1 border">
          <DataTable columns={columns} data={tableData} />
        </div>
        <div className="flex-1 border">
          <Map vehicles={vehicleData} />
        </div>
      </div>
    </>
  );
}
