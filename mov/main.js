document.addEventListener('DOMContentLoaded', function() {
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            const videoData = data[0]; // Assuming you want to play the first video from the JSON

            var player = new Clappr.Player({
                source: videoData.url,
                poster: videoData.poster,
                parentId: '#player',
                width: '100%',
                height: '360px'
            });
        })
        .catch(error => console.error('Error loading media data:', error));
});
