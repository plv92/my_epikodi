"use client";

import { useEffect, useState } from "react";

export default function FilmsPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch categories
    setCategories([
      { id: "popular", name: "Populaires" },
      { id: "top_rated", name: "Mieux notés" },
      { id: "upcoming", name: "À venir" },
      { id: "now_playing", name: "En salles" },
    ]);
  }, []);

  useEffect(() => {
    // Fetch movies based on selected category
    async function fetchMovies() {
      const res = await fetch(`/api/tmdb/movies?query=${selectedCategory}`);
      const data = await res.json();
      setMovies(data.results || []);
    }
    fetchMovies();
  }, [selectedCategory]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Films</h1>

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

      {/* Movies */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-100 p-4 rounded shadow">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold truncate">{movie.title}</h3>
            <p className="text-sm text-gray-600 truncate">
              {movie.release_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
