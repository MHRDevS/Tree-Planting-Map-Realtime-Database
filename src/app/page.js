"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import useLocalStorage from "../hooks/useLocalStorage";
import TreeForm from "../components/TreeForm";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  const { trees, addTree, loading } = useLocalStorage();
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleMapClick = (latlng) => {
    setLocation(latlng);
  };

  const handleSaveTree = async () => {
    if (!location) {
      alert("Pehle map par kisi jagah click karein!");
      return;
    }

    try {
      setSubmitting(true);
      const newTree = {
        userName: formData.userName,
        treeName: formData.treeName,
        lat: Number(location.lat),
        lng: Number(location.lng),
        date: new Date().toLocaleDateString(),
      };

      // Realtime Database me save karein
      await addTree(newTree);

      // Reset Form
      setFormData({
        userName: "",
        treeName: "",
      });
      setLocation(null);
      alert("✅ Tree successfully planted!");
    } catch (error) {
      console.error("Firebase error:", error);
      alert("Error saving tree: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-green-700">
          🌳 Tree Planting Application (Live)
        </h1>
        <p className="mb-6 text-gray-600">
          Click on the map, select a location and plant your tree.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2">
            <Map trees={trees} onMapClick={handleMapClick} />
          </div>

          {/* Form & Stats */}
          <div>
            <TreeForm
              location={location}
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveTree}
              submitting={submitting}
            />

            <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
              <h2 className="font-semibold text-gray-700">Total Trees Planted</h2>
              <p className="mt-1 text-3xl font-bold text-green-600">
                {loading ? "Loading..." : trees.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}