import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { TelemetryData } from '@/types/interface';

export default function Map({ vehicles }: {vehicles: TelemetryData | { [key: string]: TelemetryData }}) {
  const mapRef = useRef<HTMLDivElement | null>(null); // div element reference
  const mapInstanceRef = useRef<L.Map | null>(null); // map instance reference
  const markersRef = useRef<L.Marker[]>([]); // Store the markers in a ref

  useEffect(() => {
    if (!mapRef.current) return;

    // initializing map with berlin coordinates
    const map = L.map(mapRef.current, {
      center: [52.52, 13.405],
      zoom: 13,
      scrollWheelZoom: false,
    });

    // storing map in a ref, so that it will not reload for every rerender
    mapInstanceRef.current = map;

    // Add a tile layer (using OpenStreetMap as an example)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Cleanup map on unmount
    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const bounds = new L.LatLngBounds(
      new L.LatLng(52.52, 13.405),  // north-east
      new L.LatLng(52.52, 13.405) // south-west
    );
    

    // when data changes updating the markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    Object.values(vehicles).forEach((vehicle) => {
      const { vehicleId, lat, lan, speed } = vehicle;
      const marker = L.marker([lat, lan]).addTo(mapInstanceRef.current!);
      marker.bindPopup(`<b>Vehicle ${vehicleId}</b><br>Speed: ${speed.toFixed(2)} km/h`);
      markersRef.current.push(marker);
      bounds.extend(marker.getLatLng());
    });
    mapInstanceRef.current.fitBounds(bounds, { animate: true, duration: 1, easeLinearity: 1.5 });
  }, [vehicles]);

  return <div ref={mapRef} className='h-full border' />;
};
