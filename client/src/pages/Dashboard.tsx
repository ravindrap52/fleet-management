import React, { useCallback, useEffect, useState, Suspense } from "react";

import { DataTable } from "@/components/ui/Datatable/dataTable";
import { columns } from "@/components/ui/Datatable/columns";
import Map from "@/components/Map";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";
import VehicleSummary from "@/components/VehicleSummary";
import TableAscard from "@/components/TableAsCard";

import useNetworkStatus from "@/hooks/useNetworkStatus";
import useIndexedDB from "@/hooks/useIndexedDB";
import useAlerts from "@/hooks/useAlerts";

import { useSubscribeToTelemetryDataQuery } from "@/features/websocket";

import { getStatisticsOfAllVehicles, getTableData } from "@/lib/utils";
import { TelemetryData, VehicleSummaryItem } from "@/types/interface";

// lazy loading the component when user selects the vehicle
const VehicleDetails = React.lazy(() => import("@/pages/VehicleDetails"));

export default function Dashboard() {
  // storing the selected vehicle id
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );

  // managing the state of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // internal state to set the offline data
  const [offlineData, setOfflineData] = useState<{
    [key: string]: TelemetryData;
  }>({});

  // hook to detect when user went offline
  const isOnline = useNetworkStatus();

  // indexedB hook to push the data when user went offline
  const { getDataFromIndexedDB } = useIndexedDB();

  // hook to subscribe to the telemetry data
  const { data: liveData, isError } = useSubscribeToTelemetryDataQuery<{
    [vehicleId: string]: TelemetryData;
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

  // callback to show vehicle details
  const showVehicleDetails = useCallback((data: unknown) => {
    const slectedVehicle = data as TelemetryData;
    setSelectedVehicleId(slectedVehicle.vehicleId);
    setIsDialogOpen(true);
  }, []);

  // calling the alerts hook
  useAlerts(vehicleData);

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
        <div className="overflow-hidden bg-white dark:bg-gray-800 p-4 border rounded shadow flex-1">
          {/* loading data table with vehicles list */}
          <div className="hidden lg:block">
            <DataTable
              columns={columns}
              data={tableData}
              onRowClick={showVehicleDetails}
            />
          </div>

          {/* loading data table as card for small and medium screens */}
          <div className="lg:hidden">
            <TableAscard data={tableData} onRowClick={showVehicleDetails} />
          </div>
        </div>

        {/* loading map with vehicle data */}
        <div className="h-[500px] lg:h-[700px] border">
          <Map vehicles={vehicleData} />
        </div>
      </div>

      {/* loading vehicle details component, when user selects the vehicle */}
      {selectedVehicleId && (
        <Suspense fallback={<div>Loading vehicle details...</div>}>
          <VehicleDetails
            vehicleId={selectedVehicleId}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            vehicles={vehicleData}
          />
        </Suspense>
      )}
    </>
  );
}
