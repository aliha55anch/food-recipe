import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AppContext = createContext();

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function normalizeMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ quantity: measure?.trim() || "", ingredient: ingredient.trim() });
    }
  }
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image_url: meal.strMealThumb,
    publisher: meal.strArea || meal.strCategory,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    ingredients,
    source_url: meal.strSource,
    youtube_url: meal.strYoutube,
    tags: meal.strTags,
  };
}

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

  const fetchRecipes = useCallback(async function fetchRecipes(query) {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
      if (!res.ok) throw new Error("Something went wrong with fetching recipes");
      const data = await res.json();
      if (!data.meals) throw new Error("No recipes found");
      setRecipes(data.meals.map(normalizeMeal));
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRecipe = useCallback(async function fetchRecipe(id) {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      if (!res.ok) throw new Error("Something went wrong with fetching recipe");
      const data = await res.json();
      if (!data.meals?.[0]) throw new Error("Recipe not found");
      setSelectedRecipe(normalizeMeal(data.meals[0]));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
