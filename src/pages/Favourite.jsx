import { useApp } from "../context/AppContext";
import Recipe from "../components/Recipe";

export default function Favourite() {
  const { favourites } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Favourites
        </h1>
        <p className="text-gray-500 mb-8">
          {favourites.length === 0
            ? "No favourites yet. Save recipes to find them here!"
            : `${favourites.length} saved recipe${favourites.length > 1 ? "s" : ""}`}
        </p>

        {favourites.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">💔</span>
            <p className="text-gray-400 text-lg">Your favourites list is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favourites.map((recipe) => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
