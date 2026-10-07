"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import MapClickHandler from "./MapClickHandler";

// Leaflet default marker bug fix aur custom marker icon
const treeIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({ trees, onMapClick }) => {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-lg shadow-sm border border-gray-200">
      <MapContainer
        center={[24.8607, 67.0011]} // Karachi coordinates
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={onMapClick} />

        {trees && trees.map((tree) => (
          <Marker
            key={tree.id}
            position={[tree.lat, tree.lng]}
            icon={treeIcon}
          >
            <Popup>
              <div className="min-w-[160px] p-1">
                <h3 className="text-base font-bold text-green-700">
                  🌳 {tree.treeName}
                </h3>
                <p className="mt-1 text-sm text-gray-700">
                  <span className="font-semibold">Planted by:</span> {tree.userName}
                </p>
                <p className="text-xs text-gray-500">
                  Lat: {Number(tree.lat).toFixed(4)} | Lng: {Number(tree.lng).toFixed(4)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Date: {tree.date}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;