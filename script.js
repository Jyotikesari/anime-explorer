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

        const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=25");
        const data = await response.json();

        loading.style.display = "none";

        allAnime = data.data;

        displayAnime(allAnime);

    } catch (error) {
        loading.textContent = "Something went wrong. Please try again!";
        console.error(error);
    }
}

function displayAnime(animeList) {
    animeContainer.innerHTML = "";

    resultsCount.textContent = `Showing ${animeList.length} anime`;

    if (animeList.length === 0) {
        animeContainer.innerHTML = `<p id="no-results">No anime found 😢</p>`;
        return;
    }

    animeList.map((anime) => {
        const card = document.createElement("div");
        card.classList.add("anime-card");

        const genres = anime.genres.map(g => g.name).join(", ");

        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>⭐ Score: ${anime.score ?? "N/A"}</p>
                <p>🎬 Episodes: ${anime.episodes ?? "N/A"}</p>
                <p>🎭 ${genres || "N/A"}</p>
            </div>
        `;

        animeContainer.appendChild(card);
    });
}

function searchAnime() {
    const query = searchInput.value.toLowerCase();

    const filtered = allAnime.filter((anime) => 
        anime.title.toLowerCase().includes(query)
    );

    applyFiltersAndSort(filtered);
}

function filterByGenre(animeList) {
    const selectedGenre = genreFilter.value;

    if (selectedGenre === "all") return animeList;

    return animeList.filter((anime) =>
        anime.genres.some((g) => g.name === selectedGenre)
    );
}

function sortAnime(animeList) {
    const sortValue = sortSelect.value;

    return animeList.slice().sort((a, b) => {
        if (sortValue === "score-desc") return (b.score ?? 0) - (a.score ?? 0);
        if (sortValue === "score-asc") return (a.score ?? 0) - (b.score ?? 0);
        if (sortValue === "title-asc") return a.title.localeCompare(b.title);
        if (sortValue === "title-desc") return b.title.localeCompare(a.title);
        if (sortValue === "episodes-desc") return (b.episodes ?? 0) - (a.episodes ?? 0);
    });
}

function applyFiltersAndSort(animeList = allAnime) {
    const searched = searchInput.value.toLowerCase()
        ? animeList.filter(anime => anime.title.toLowerCase().includes(searchInput.value.toLowerCase()))
        : animeList;

    const filtered = filterByGenre(searched);
    const sorted = sortAnime(filtered);

    displayAnime(sorted);
}

themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";

    html.setAttribute("data-theme", isDark ? "light" : "dark");
    themeToggle.textContent = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
});

searchInput.addEventListener("input", applyFiltersAndSort);
genreFilter.addEventListener("change", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);

fetchAnime();
