# Food Recipe App

A responsive single-page application for searching, browsing, and saving food recipes using the [Forkify API](https://forkify-api.jonas.io).

## Features

- **Search Recipes** -- Search thousands of recipes by keyword with quick-access category buttons (Pizza, Pasta, Chicken, Beef, Salmon, Soup)
- **Recipe Details** -- View full recipe information including ingredients, cooking time, servings, and publisher
- **Favourites** -- Save and unsave recipes with persistent local storage
- **Responsive Design** -- Mobile-first layout that adapts across all screen sizes

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
│   ├── Navbar.jsx        # Top navigation bar
│   └── Recipe.jsx        # Recipe card component
├── context/
│   └── AppContext.jsx     # Global state management
├── pages/
│   ├── Home.jsx           # Search and recipe listing
│   ├── Favourite.jsx      # Saved recipes
│   └── RecipeDetail.jsx   # Individual recipe view
├── App.jsx                # Routing setup
├── index.css              # Global styles
└── main.jsx               # Entry point
```

## API

Uses the free [Forkify API](https://forkify-api.jonas.io) -- no API key required.

| Endpoint | Description |
|---|---|
| `GET /recipes?search={query}` | Search recipes |
| `GET /recipes/{id}` | Get recipe details |

## License

MIT
