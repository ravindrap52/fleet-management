import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/Datatable/dataTable";
import { columns } from "@/components/ui/Datatable/columns";
import Map from "@/components/Map";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";
import VehicleSummary from "@/components/VehicleSummary";

import useNetworkStatus from "@/hooks/useNetworkStatus";
import useIndexedDB from "@/hooks/useIndexedDB";

import { useSubscribeToTelemetryDataQuery } from "@/features/websocket";

import { getStatisticsOfAllVehicles, getTableData } from "@/lib/utils";
import { TelemetryData, VehicleSummaryItem } from "@/types/interface";

export default function Dashboard() {
  // hook to detect when user went offline
  const isOnline = useNetworkStatus();

  // indexedB hook to push the data when user went offline
  const { getDataFromIndexedDB } = useIndexedDB();

  // hook to subscribe to the telemetry data
  const { data: liveData, isError } = useSubscribeToTelemetryDataQuery<{
    [vehicleId: string]: TelemetryData;
  }>({});

  // internal state to set the offline data
  const [offlineData, setOfflineData] = useState<{
    [key: string]: TelemetryData;
  }>({});

  // Fetch data from IndexedDB when offline
  useEffect(() => {
    if (!isOnline) {
      const fetchData = async () => {
        // getting data from indexed db
        const storedData = await getDataFromIndexedDB();
        if (storedData) {
          setOfflineData(storedData);
          console.log("Loaded offline data from IndexedDB:", storedData);
        }
      };
      fetchData();
    }
  }, [isOnline, getDataFromIndexedDB]);

  // storing vehicle data, either livedata or data from indexeddb
  const vehicleData = isOnline ? liveData : offlineData;

  // showing error message when error occured while subscribing to the websocket
  if (isError) {
    return <div>Error occurred while fetching data!</div>;
  }

  // showing loading skeleton while data is loading
  if (!vehicleData || Object.keys(vehicleData).length === 0) {
    return <DashboardSkeleton />;
  }

  // Prepare a summary for all vehicles
  const allVehicleSummaries: VehicleSummaryItem[] =
    getStatisticsOfAllVehicles(vehicleData);

  // fetching data for the table
  const tableData = getTableData(vehicleData);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Display all vehicle summaries collectively */}
        <VehicleSummary vehicleSummaries={allVehicleSummaries} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        <div className="overflow-auto bg-white dark:bg-gray-800 p-4 border rounded shadow">
          <div className="hidden lg:block">
            <DataTable columns={columns} data={tableData} />
          </div>

          <div className="lg:hidden">
            <div className="space-y-4">
              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="flex flex-col space-y-1.5 p-4">
                  <div className="font-semibold leading-none tracking-tight">
                    Team Members
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Invite your team members to collaborate.
                  </div>
                </div>
                <div className="p-4 pt-0 grid gap-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <p className="relative flex shrink-0 text-sm font-semibold">
                        Status:
                      </p>
                      <p className="text-sm font-medium leading-none">
                        Offline
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                <p className="font-bold text-lg">V002</p>
                <p>
                  <strong>Status:</strong> Offline
                </p>
                <p>
                  <strong>Battery:</strong> 60%
                </p>
                <p>
                  <strong>Speed:</strong> 0 km/h
                </p>
                <p>
                  <strong>Location:</strong> Los Angeles
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-full border"
        >
          <Map vehicles={vehicleData} />
        </div>
      </div>
    </>
  );
}
