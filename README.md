🎌 Anime Explorer

A web application to browse, search, filter and sort anime using the Jikan API.

---

📌 Purpose

Anime Explorer lets users discover top-rated anime, search by title, filter by genre, sort by score or popularity — all in a clean, responsive interface with dark and light mode.

---

🌐 API Used

- API: [Jikan API v4](https://jikan.moe)
- Base URL: https://api.jikan.moe/v4/
- No API key required**
- Endpoints used:**
  - GET /top/anime — Fetch top anime list

---

✨ Features Implemented

### Core Features
- 🔍 **Search** — Search anime by title using .filter()
- 🎭 **Genre Filter** — Filter by genre using .filter() and .some()
- ⬆️ **Sort** — Sort by score or title using .sort()
- 🌙 **Dark / Light Mode** — Theme toggle saved in Local Storage

### Bonus Features
- ⏳ Debouncing — Waits 500ms after user stops typing before searching
- ❤️ Favourites — Save favourite anime using Local Storage
- 📄 Pagination — Browse 10 anime per page with Prev/Next buttons
- ⏳ Loading Indicator — Shows loading message while fetching data
- 🛡️ Error Handling — Displays error message if API call fails

---

🛠️ Technologies Used

- HTML5 — Structure and layout
- CSS3 — Styling, responsive design, CSS variables for theming
- JavaScript (Vanilla)** — Logic, DOM manipulation, API integration
- Jikan API — Anime data via fetch()
- Local Storage — Saving favourites and theme preference
- Google Fonts — Poppins font
- Array HOFs used:
  - .filter() — Search and genre filtering
  - .sort() — Sorting anime list
  - .map() — Rendering anime cards
  - .some() — Checking genre match
  - .slice() — Pagination

---

🚀 Setup and Running

1. Clone the repository
2. Open the project folder
3. Open index.html in your browser using Live Server in VS Code
4. No API key or installation needed!

---

📁 Project Structure

- index.html — Main HTML structure
- style.css — All styling and theme variables
- script.js — API calls, HOFs, all functionality
- README.md — Project documentation

---

🌍 Live Demo

[Click here to view the live project](https://Jyotikesari.github.io/anime-explorer)

---

✅ Milestones Completed

| Milestone | Description | Status |
|---|---|---|
| Milestone 1 | Project setup and README | ✅ Done |
| Milestone 2 | API integration and display | ✅ Done |
| Milestone 3 | Search, filter, sort, dark mode | ✅ Done |
| Milestone 4 | Bonus features and deployment | ✅ Done |

---

👤 Author
Jyoti Kesari
