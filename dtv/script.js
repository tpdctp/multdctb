// script.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://jio.dinesh29.com.np/jio-universal.m3u')
        .then(response => response.text())
        .then(data => parseM3U(data))
        .catch(error => console.error('Error fetching channels:', error));
});

function parseM3U(m3uData) {
    const channels = [];

    // Regex to extract channel names and URLs from M3U file
    const regex = /#EXTINF:-1 tvg-id="([^"]+)" tvg-logo="([^"]+)" group-title="([^"]+)",(.*)\n([^#]+)/gm;
    let match;

    while ((match = regex.exec(m3uData)) !== null) {
        const channel = {
            id: match[1],
            logo: match[2],
            name: match[4].trim(),
            url: match[5].trim()
        };
        channels.push(channel);
    }

    displayChannels(channels);
}

function displayChannels(channels) {
    const channelList = document.getElementById('channel-list');

    channels.forEach(channel => {
        const channelElement = document.createElement('div');
        channelElement.classList.add('channel');
        channelElement.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}" style="max-width: 100px;">
            <h3>${channel.name}</h3>
        `;
        channelElement.addEventListener('click', function() {
            openPopup(channel.name, channel.url);
        });
        channelList.appendChild(channelElement);
    });
}

function openPopup(channelName, channelUrl) {
    const playerContainer = document.getElementById('player-container');

    jwplayer('player-container').setup({
        file: channelUrl,
        type: 'auto',
        width: '100%',
        aspectratio: '16:9',
        autostart: true,
        mute: false,
        primary: 'html5'
    });

    const playerPopup = document.getElementById('player-popup');
    playerPopup.style.display = 'flex';
}

function closePopup() {
    const playerPopup = document.getElementById('player-popup');
    playerPopup.style.display = 'none';

    // Stop JW Player when closing popup
    jwplayer('player-container').stop();
}
