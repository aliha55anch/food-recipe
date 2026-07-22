import { Link } from "react-router";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { favourites } = useApp();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="text-xl font-bold text-gray-900">
              Food Recipe
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              to="/favourites"
              className="relative text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              Favourites
              {favourites.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favourites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
