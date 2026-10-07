"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import TreeForm from "../components/TreeForm";

// SSR disable karne ke liye Map ko dynamically import kiya hai
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  // Simple React state: Page reload karne par yeh reset ho kar [] ho jayegi
  const [trees, setTrees] = useState([]);
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });

  // Map par click karne par location capture karna
  const handleMapClick = (latlng) => {
    setLocation(latlng);
  };

  // Naya tree plant karna (sirf current session ke liye)
  const handleSaveTree = () => {
    if (!location) {
      alert("Map par click karke location select karein!");
      return;
    }

    const newTree = {
      id: Date.now(),
      userName: formData.userName,
      treeName: formData.treeName,
      lat: Number(location.lat),
      lng: Number(location.lng),
      date: new Date().toLocaleDateString(),
    };

    // State update: naya tree add karein
    setTrees((prevTrees) => [...prevTrees, newTree]);

    // Form aur selected location reset
    setFormData({
      userName: "",
      treeName: "",
    });
    setLocation(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-green-700">
          🌳 Tree Planting Application
        </h1>
        <p className="mb-6 text-gray-600">
          Click on the map, select a location and plant your tree.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Map trees={trees} onMapClick={handleMapClick} />
          </div>

          {/* Form & Counter Section */}
          <div>
            <TreeForm
              location={location}
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveTree}
            />

            <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
              <h2 className="font-semibold text-gray-700">
                Trees Planted (This Session)
              </h2>
              <p className="mt-1 text-3xl font-bold text-green-600">
                {trees.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}