import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useApp } from "../context/AppContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const { selectedRecipe, setSelectedRecipe, fetchRecipe, isLoading, error, toggleFavourite, isFavourite } =
    useApp();

  useEffect(() => {
    fetchRecipe(id);
    return () => setSelectedRecipe(null);
  }, [id, fetchRecipe, setSelectedRecipe]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <p className="text-gray-500 text-lg mb-4">{error}</p>
        <Link to="/" className="text-orange-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!selectedRecipe) return null;

  const recipe = selectedRecipe;
  const liked = isFavourite(recipe.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-72 sm:h-96">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Link
          to="/"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
        >
          ← Back
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {recipe.title}
              </h1>
              <p className="text-gray-500">by {recipe.publisher}</p>
            </div>
            <button
              onClick={() => toggleFavourite(recipe)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer shrink-0 ${
                liked
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {liked ? "❤️ Saved" : "🤍 Save to Favourites"}
            </button>
          </div>

          {/* Info Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {recipe.cooking_time && (
              <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium">
                ⏱ {recipe.cooking_time} min
              </span>
            )}
            {recipe.servings && (
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                👥 {recipe.servings} servings
              </span>
            )}
            {recipe.publisher && (
              <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                📖 {recipe.publisher}
              </span>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Ingredients
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {recipe.ingredients?.map((ing, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-orange-500 mt-0.5">✓</span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {ing.quantity ? `${ing.quantity} ` : ""}
                    {ing.unit ? `${ing.unit} ` : ""}
                    {ing.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Source Link */}
          {recipe.source_url && (
            <div className="pt-6 border-t border-gray-100">
              <a
                href={recipe.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Original Recipe →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
