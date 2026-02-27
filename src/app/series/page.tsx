"use client";

import { useEffect, useState } from "react";

export default function SeriesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Fetch categories
    setCategories([
      { id: "popular", name: "Populaires" },
      { id: "top_rated", name: "Mieux notées" },
      { id: "on_the_air", name: "En cours" },
      { id: "airing_today", name: "Diffusées aujourd'hui" },
    ]);
  }, []);

  useEffect(() => {
    // Fetch series based on selected category
    async function fetchSeries() {
      const res = await fetch(`/api/tmdb/series?query=${selectedCategory}`);
      const data = await res.json();
      setSeries(data.results || []);
    }
    fetchSeries();
  }, [selectedCategory]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Séries</h1>

      {/* Categories */}
      <div className="flex gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Series */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {series.map((serie) => (
          <div key={serie.id} className="bg-gray-100 p-4 rounded shadow">
            <img
              src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              alt={serie.name}
              className="w-full h-64 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold truncate">{serie.name}</h3>
            <p className="text-sm text-gray-600 truncate">
              {serie.first_air_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
