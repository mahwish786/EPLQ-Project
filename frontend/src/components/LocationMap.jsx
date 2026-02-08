'use client';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Next.js Leaflet Icons
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapEvents = ({ onLocationSelect }) => {
  const map = useMap();
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
      map.flyTo([lat, lng], map.getZoom());
    },
  });
  return null;
};

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if(lat && lng) {
      map.flyTo([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
};

const LocationMap = ({ lat, lng, onLocationSelect }) => {
  const defaultPosition = [20.5937, 78.9629]; 
  const position = (lat && lng) ? [lat, lng] : defaultPosition;

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-300 z-0">
      <MapContainer center={position} zoom={5} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onLocationSelect={onLocationSelect} />
        <RecenterMap lat={lat} lng={lng} />
        {lat && lng && <Marker position={[lat, lng]} />}
      </MapContainer>
    </div>
  );
};

export default LocationMap;