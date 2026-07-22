import { Link } from "react-router";
import { useApp } from "../context/AppContext";

export default function Recipe({ recipe }) {
  const { toggleFavourite, isFavourite } = useApp();
  const liked = isFavourite(recipe.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="relative overflow-hidden aspect-4/3">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2 mb-1">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-500">{recipe.publisher}</p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavourite(recipe);
          }}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
            liked
              ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          {liked ? "❤️ Saved" : "🤍 Save"}
        </button>
      </div>
    </div>
  );
}
