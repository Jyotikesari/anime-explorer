const animeContainer = document.getElementById("anime-container");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("search-input");
const genreFilter = document.getElementById("genre-filter");
const sortSelect = document.getElementById("sort-select");
const themeToggle = document.getElementById("theme-toggle");
const resultsCount = document.getElementById("results-count");

let allAnime = [];

async function fetchAnime() {
    try {
        loading.style.display = "block";

        const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=25");
        const data = await res.json();

        loading.style.display = "none";

        allAnime = data.data;
        applyFiltersAndSort();

    } catch (err) {
        loading.textContent = "Error loading data";
    }
}

function displayAnime(list) {
    animeContainer.innerHTML = "";
    resultsCount.textContent = `Showing ${list.length} anime`;

    if (list.length === 0) {
        animeContainer.innerHTML = "<p>No anime found 😢</p>";
        return;
    }

    list.forEach(anime => {
        const card = document.createElement("div");
        card.classList.add("anime-card");

        const genres = anime.genres.map(g => g.name).join(", ");

        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>⭐ ${anime.score ?? "N/A"}</p>
                <p>🎬 ${anime.episodes ?? "N/A"}</p>
                <p>${genres}</p>
            </div>
        `;

        animeContainer.appendChild(card);
    });
}

function applyFiltersAndSort() {
    let result = allAnime;

    const query = searchInput.value.toLowerCase();
    if (query) {
        result = result.filter(a =>
            a.title.toLowerCase().includes(query)
        );
    }

    const genre = genreFilter.value;
    if (genre !== "all") {
        result = result.filter(a =>
            a.genres.some(g => g.name === genre)
        );
    }

    result = result.slice().sort((a, b) => {
        const val = sortSelect.value;

        if (val === "score-desc") return (b.score ?? 0) - (a.score ?? 0);
        if (val === "score-asc") return (a.score ?? 0) - (b.score ?? 0);
        if (val === "title-asc") return a.title.localeCompare(b.title);
        if (val === "title-desc") return b.title.localeCompare(a.title);
        if (val === "episodes-desc") return (b.episodes ?? 0) - (a.episodes ?? 0);

        return 0;
    });

    displayAnime(result);
}

themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const dark = html.getAttribute("data-theme") === "dark";

    html.setAttribute("data-theme", dark ? "light" : "dark");
    themeToggle.textContent = dark ? "🌙 Dark Mode" : "☀️ Light Mode";
});

searchInput.addEventListener("input", applyFiltersAndSort);
genreFilter.addEventListener("change", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);

fetchAnime();
