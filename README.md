# Food Recipe App

A responsive single-page application for searching, browsing, and saving food recipes using the [TheMealDB API](https://www.themealdb.com/api.php).

## Features

- **Search Recipes** -- Search thousands of recipes by keyword with quick-access category buttons (Chicken, Pasta, Beef, Salmon, Rice, Egg)
- **Recipe Details** -- View full recipe information including ingredients, cooking time, servings, area, and category
- **Favourites** -- Save and unsave recipes with persistent local storage
- **Responsive Design** -- Mobile-first layout that adapts across all screen sizes
- **Loading States** -- Animated spinners for search and recipe loading
- **Error Handling** -- Graceful error messages with retry functionality

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [React Router](https://reactrouter.com/) 8

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

### Installation

```bash
git clone https://github.com/aliha55anch/food-recipe.git
cd Food-Recipe-App
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Top navigation bar with favourites count
│   └── Recipe.jsx        # Recipe card component with favourite toggle
├── context/
│   └── AppContext.jsx     # Global state management and API calls
├── pages/
│   ├── Home.jsx           # Search and recipe listing
│   ├── Favourite.jsx      # Saved recipes
│   └── RecipeDetail.jsx   # Individual recipe view with ingredients
├── App.jsx                # Routing setup
├── index.css              # Global styles
└── main.jsx               # Entry point
```

## API

Uses the free [TheMealDB API](https://www.themealdb.com/api.php) -- no API key required.

| Endpoint | Description |
|---|---|
| `GET /api/json/v1/1/search.php?s={query}` | Search meals by name |
| `GET /api/json/v1/1/lookup.php?i={id}` | Lookup full meal details by ID |

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | Home | Search and browse recipes |
| `/favourites` | Favourite | View saved recipes |
| `/recipe/:id` | RecipeDetail | View individual recipe details |

---

## 👨‍💻 Developed by: 

Muhammad Ali Hassan 

---

## Github Profile

GitHub: https://github.com/aliha55anch

---

## ⭐ Support

If you like this project, consider giving it a star on GitHub ⭐
