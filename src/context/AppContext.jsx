import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const BASE_URL = "https://forkify-api.jonas.io/api/v2/recipes";

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("pizza");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  async function fetchRecipes(query) {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}?search=${query}`);
      const data = await res.json();
      if (data.results === 0) throw new Error("No recipes found");
      setRecipes(data.data.recipes);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRecipe(id) {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      setSelectedRecipe(data.data.recipe);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function toggleFavourite(recipe) {
    setFavourites((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      if (exists) return prev.filter((r) => r.id !== recipe.id);
      return [...prev, recipe];
    });
  }

  function isFavourite(id) {
    return favourites.some((r) => r.id === id);
  }

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        recipes,
        selectedRecipe,
        setSelectedRecipe,
        isLoading,
        error,
        fetchRecipes,
        fetchRecipe,
        favourites,
        toggleFavourite,
        isFavourite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
