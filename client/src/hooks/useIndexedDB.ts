import { TelemetryData } from "@/types/interface";
import { useEffect, useState } from "react";

// Define the IndexedDB Database type
type IDBDatabaseInstance = IDBDatabase | null;

async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("vehicleDataDB", 1);

    request.onerror = (e) => reject(e);
    
    // This event is triggered when the database is successfully opened
    request.onsuccess = (e) => {
      const db = (e.target as IDBRequest).result as IDBDatabase;
      resolve(db);
    };

    // This event is triggered when the database needs to be upgraded (for example, when a new version is being created)
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBRequest).result as IDBDatabase;
      // Create object store (vehiclesData) to store telemetry data
      if (!db.objectStoreNames.contains("vehiclesData")) {
        db.createObjectStore("vehiclesData");
      }
    };
  });
}

export default function useIndexedDB() {
  const [db, setDb] = useState<IDBDatabaseInstance>(null);
  const [error, setError] = useState<string>("");

  // on mount opening a db connection
  useEffect(() => {
    const openDB = async () => {
      try {
        const dbInstance = await openDatabase();
        setDb(dbInstance);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError("Error opening IndexedDB: " + error.message);
        } else {
          console.error(error);
        }
      }
    };

    openDB();
  }, []);

  // Save data to IndexedDB
  async function saveToIndexedDB(data: { [key: string]: TelemetryData }) {
    if (!db) {
      setError("Database not initialized yet.");
      return;
    }
    const transaction = db.transaction("vehiclesData", "readwrite");
    const store = transaction.objectStore("vehiclesData");
    // const id = `vehicleData-${new Date().toISOString()}`;
    store.put(data, "latestTelemetry");  // store data with "id" as the key

    return new Promise<string>((resolve, reject) => {
      transaction.oncomplete = () => resolve("Data saved!");
      transaction.onerror = (err) => reject(err);
    });
  }

  // Retrieve data from IndexedDB
  async function getDataFromIndexedDB(): Promise<{ [key: string]: TelemetryData }> {
    if (!db) {
      setError("Database not initialized yet.");
      return {};
    }

    const transaction = db.transaction("vehiclesData", "readonly");
    const store = transaction.objectStore("vehiclesData");
    const request = store.get("latestTelemetry"); // Retrieve stored object

    return new Promise<{ [key: string]: TelemetryData }>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || {});
      request.onerror = (err) => reject(err);
    });
  }

  return {
    db,
    error,
    saveToIndexedDB,
    getDataFromIndexedDB,
  };
}
