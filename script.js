const animeContainer = document.getElementById("anime-container");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("search-input");
const genreFilter = document.getElementById("genre-filter");
const sortSelect = document.getElementById("sort-select");
const themeToggle = document.getElementById("theme-toggle");
const resultsCount = document.getElementById("results-count");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

let allAnime = [];
let currentPage = 1;
const itemsPerPage = 10;

function getFavourites() {
    return JSON.parse(localStorage.getItem("favourites")) || [];
}

function saveFavourites(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
}

async function fetchAnime() {
    try {
        loading.style.display = "block";
        animeContainer.innerHTML = "";

        const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=25");
        const data = await response.json();

        loading.style.display = "none";

        allAnime = data.data;
        displayAnime(getFilteredAndSorted());

    } catch (error) {
        loading.textContent = "Something went wrong. Please try again!";
        console.error(error);
    }
}


function getFilteredAndSorted() {
    const query = searchInput.value.toLowerCase();

    const searched = allAnime.filter(anime =>
        anime.title.toLowerCase().includes(query)
    );

    const filtered = filterByGenre(searched);
    const sorted = sortAnime(filtered);

    return sorted;
}

function displayAnime(animeList) {
    animeContainer.innerHTML = "";

    const totalPages = Math.ceil(animeList.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedList = animeList.slice(start, end);

    resultsCount.textContent = `Showing ${animeList.length} anime`;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    if (paginatedList.length === 0) {
        animeContainer.innerHTML = `<p id="no-results">No anime found 😢</p>`;
        return;
    }

    const favourites = getFavourites();

    paginatedList.map((anime) => {
        const card = document.createElement("div");
        card.classList.add("anime-card");

        const genres = anime.genres.map(g => g.name).join(", ");
        const isFav = favourites.includes(anime.mal_id);

        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>⭐ Score: ${anime.score ?? "N/A"}</p>
                <p>🎬 Episodes: ${anime.episodes ?? "N/A"}</p>
                <p>🎭 ${genres || "N/A"}</p>
                <button class="fav-btn ${isFav ? "fav-active" : ""}" 
                data-id="${anime.mal_id}">
                    ${isFav ? "❤️ Saved" : "🤍 Favourite"}
                </button>
            </div>
        `;

        card.querySelector(".fav-btn").addEventListener("click", () => {
            toggleFavourite(anime.mal_id, card.querySelector(".fav-btn"));
        });

        animeContainer.appendChild(card);
    });
}

function toggleFavourite(id, btn) {
    let favourites = getFavourites();
    const isFav = favourites.includes(id);

    if (isFav) {
        favourites = favourites.filter(favId => favId !== id);
        btn.textContent = "🤍 Favourite";
        btn.classList.remove("fav-active");
    } else {
        favourites.push(id);
        btn.textContent = "❤️ Saved";
        btn.classList.add("fav-active");
    }

    saveFavourites(favourites);
}

function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => func(), delay);
    };
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

function applyFiltersAndSort() {
    currentPage = 1;
    displayAnime(getFilteredAndSorted());
}

themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";
    html.setAttribute("data-theme", isDark ? "light" : "dark");
    themeToggle.textContent = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
    localStorage.setItem("theme", isDark ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";


prevBtn.addEventListener("click", () => {
    currentPage--;
    displayAnime(getFilteredAndSorted());
});

nextBtn.addEventListener("click", () => {
    currentPage++;
    displayAnime(getFilteredAndSorted());
});

searchInput.addEventListener("input", debounce(applyFiltersAndSort, 500));
genreFilter.addEventListener("change", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);

fetchAnime();
