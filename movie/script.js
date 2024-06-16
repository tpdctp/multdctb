new Clappr.Player({
  source: "http://clappr.io/highline.mp4",
  mute: false,
  autoPlay: true,
  parent: '#player-container',
  width: '100%',
  height: '100%',
  hlsjsConfig: {
    // here any hls.js configuration options
  }
})