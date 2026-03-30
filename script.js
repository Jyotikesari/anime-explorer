const animeContainer = document.getElementById("anime-container");
const loading = document.getElementById("loading");

async function fetchAnime() {
    try {
        loading.style.display = "block";

        const response = await fetch("https://api.jikan.moe/v4/top/anime");
        const data = await response.json();

        loading.style.display = "none";

        displayAnime(data.data);

    } catch (error) {
        loading.textContent = "Something went wrong. Please try again!";
        console.error(error);
    }
}

function displayAnime(animeList) {
    animeContainer.innerHTML = "";

    animeList.map((anime) => {
        const card = document.createElement("div");
        card.classList.add("anime-card");

        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>⭐ Score: ${anime.score ?? "N/A"}</p>
                <p>🎭 Episodes: ${anime.episodes ?? "N/A"}</p>
                <p>📅 Year: ${anime.year ?? "N/A"}</p>
            </div>
        `;

        animeContainer.appendChild(card);
    });
}

fetchAnime();