import { BrowserRouter, Routes, Route } from "react-router";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourite />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
