document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movieList');
    const movieId = new URLSearchParams(window.location.search).get('id');

    fetch('../database.json')
        .then(response => response.json())
        .then(data => {
            if (movieList) {
                renderMovieList(data);
            } else if (movieId) {
                renderMovieDetails(data, movieId);
            }
        })
        .catch(error => console.error('Error fetching the JSON:', error));

    function renderMovieList(movies) {
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';

            movieItem.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <h2><a href="movies/movie.html?id=${movie.id}">${movie.title}</a></h2>
                <p>${movie.description}</p>
            `;

            movieList.appendChild(movieItem);
        });
    }

    function renderMovieDetails(movies, id) {
        const movie = movies.find(movie => movie.id == id);

        if (movie) {
            const movieTitle = document.getElementById('movieTitle');
            const moviePoster = document.getElementById('moviePoster');
            const movieDescription = document.getElementById('movieDescription');

            movieTitle.textContent = movie.title;
            moviePoster.src = movie.poster;
            movieDescription.textContent = movie.description;

            new Clappr.Player({
                parentId: '#player',
                source: movie.url,
                poster: movie.poster,
                autoPlay: false
            });
        } else {
            document.body.innerHTML = '<h1>Movie not found</h1>';
        }
    }
});
