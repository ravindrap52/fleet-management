import { useState, useEffect } from "react";

export default function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    // function to update the state when it is online
    const handleOnline = () => setIsOnline(true);

    // function to update the state when it is online offline
    const handleOffline = () => setIsOnline(false);

    // adding event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // removing when the component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
