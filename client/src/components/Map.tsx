import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { TelemetryData } from '@/types/interface';

export default function Map({ vehicles }: {vehicles: TelemetryData | { [key: string]: TelemetryData }}) {
  const mapRef = useRef<HTMLDivElement | null>(null); // div element reference
  const mapInstanceRef = useRef<L.Map | null>(null); // map instance reference
  const markersRef = useRef<L.Marker[]>([]); // Store the markers in a ref

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map only once (when the component mounts)
    const map = L.map(mapRef.current, {
      center: [52.52, 13.405],
      zoom: 13,
      scrollWheelZoom: false,
    });

    // Store map instance in the ref
    mapInstanceRef.current = map;

    // Add a tile layer (using OpenStreetMap as an example)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Cleanup map on unmount
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures map is created only once

  useEffect(() => {
    if (!mapInstanceRef.current) return; // Check if map instance exists

    // Update markers when vehicles data changes
    markersRef.current.forEach(marker => marker.remove()); // Remove old markers
    markersRef.current = []; // Clear markersRef

    Object.values(vehicles).forEach((vehicle) => {
      const { vehicleId, lat, lan, speed } = vehicle;
      const marker = L.marker([lat, lan]).addTo(mapInstanceRef.current!); // Add to map instance
      marker.bindPopup(`<b>Vehicle ${vehicleId}</b><br>Speed: ${speed.toFixed(2)} km/h`);
      markersRef.current.push(marker); // Store the new marker in the ref
    });
  }, [vehicles]); // Re-run this effect only when `vehicles` change

  return <div ref={mapRef} className='h-[500px] border' />;
};
