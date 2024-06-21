document.addEventListener('DOMContentLoaded', function () {
    const channelDataUrl = 'https://jio.dinesh29.com.np/jio-universal.m3u';
    const channelGrids = document.getElementById('channel-grids');
    const popupPlayer = document.getElementById('popup-player');
    const playerContainer = document.getElementById('player-container');
    const closePlayerBtn = document.getElementById('close-player');

    // Fetch channel data from JSON
    fetch(channelDataUrl)
        .then(response => response.text())
        .then(data => {
            // Process data to extract channel names and URLs
            const channelEntries = data.split('#EXTINF').filter(entry => entry.includes('http'));
            const channels = channelEntries.map(entry => {
                const nameStart = entry.indexOf(',') + 1;
                const nameEnd = entry.indexOf('\n');
                const name = entry.substring(nameStart, nameEnd).trim();
                const url = entry.substring(entry.indexOf('http'), entry.indexOf('\n')).trim();
                return { name, url };
            });

            // Create channel cards and populate the grids
            channels.forEach(channel => {
                const card = document.createElement('div');
                card.className = 'channel-card';
                card.textContent = channel.name;
                card.addEventListener('click', () => openPlayer(channel.url));
                channelGrids.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching channel data:', error));

    // Function to open the popup player with a given stream URL
    function openPlayer(url) {
        jwplayer(playerContainer).setup({
            file: url,
            type: 'auto',
            width: '100%',
            aspectratio: '16:9',
            autostart: true,
            mute: false,
            primary: 'html5'
        });

        // Display the popup player
        popupPlayer.style.display = 'block';
    }

    // Close the popup player
    closePlayerBtn.addEventListener('click', () => {
        jwplayer(playerContainer).remove();
        popupPlayer.style.display = 'none';
    });
});
