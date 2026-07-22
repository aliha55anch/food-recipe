import { useState } from "react";
import { useApp } from "../context/AppContext";
import Recipe from "../components/Recipe";

const QUICK_SEARCHES = ["Pizza", "Pasta", "Chicken", "Beef", "Salmon", "Soup"];

export default function Home() {
  const { searchQuery, setSearchQuery, recipes, isLoading, error, fetchRecipes } =
    useApp();
  const [input, setInput] = useState(searchQuery);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setSearchQuery(input.trim());
    fetchRecipes(input.trim());
  }

  function handleQuickSearch(term) {
    setInput(term);
    setSearchQuery(term);
    fetchRecipes(term);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Discover Delicious Recipes
          </h1>
          <p className="text-orange-100 text-lg mb-8">
            Search from thousands of recipes to find your next favorite meal
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex max-w-xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search recipes..."
              className="flex-1 px-5 py-3.5 rounded-l-xl text-gray-900 text-base outline-none border-2 border-white/20 focus:border-white/50 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-white text-orange-600 font-semibold rounded-r-xl hover:bg-orange-50 transition-colors border-2 border-white/20 border-l-0 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Searches */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {QUICK_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => handleQuickSearch(term)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  searchQuery.toLowerCase() === term.toLowerCase()
                    ? "bg-white text-orange-600"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{error}</p>
            <button
              onClick={() => fetchRecipes(searchQuery)}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && recipes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {recipes.length} recipes for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
