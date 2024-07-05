document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.movies-grid');
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");
    const closeBtn = document.querySelector(".close");
    const videoPlayer = videojs('video-player');

    fetch('data/movies.json')
        .then(response => response.json())
        .then(movies => {
            movies.forEach(async (movie) => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');

                const imdbData = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=151b4a59`)
                    .then(response => response.json());

                movieElement.innerHTML = `
                    <img src="${movie.thumbnail}" alt="${movie.title}">
                    <h2>${movie.title}</h2>
                    <p>${imdbData.Plot}</p>
                    <p><strong>IMDb Rating:</strong> ${imdbData.imdbRating}</p>
                `;

                movieElement.addEventListener('click', () => {
                    videoPlayer.src({ type: "video/mp4", src: movie.file });
                    modal.style.display = "block";
                    videoPlayer.play();
                });

                container.appendChild(movieElement);
            });
        })
        .catch(error => console.error('Error loading movies:', error));

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        videoPlayer.pause();
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            videoPlayer.pause();
        }
    });
});
