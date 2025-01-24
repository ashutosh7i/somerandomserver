const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyBdvn49DNz5SKEpaS_8n161MwkjhkTWsUk';
const dataFilePath = path.join(__dirname, 'data.json');

const fetchLiveUrls = async () => {
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  const liveTemples = data.filter(temple => temple.live);

  const channels = liveTemples.map(temple => ({
    channelId: temple.streamInfo.channelId,
    title: temple.streamInfo.title
  }));

  const streams = await Promise.all(channels.map(async (channel) => {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.channelId}&eventType=live&type=video&key=${API_KEY}`);
    return response.data.items[0];
  }));

  streams.forEach((stream, index) => {
    if (stream) {
      liveTemples[index].liveUrl = `https://www.youtube.com/embed/${stream.id.videoId}`;
    }
  });

  liveTemples.forEach(liveTemple => {
    const index = data.findIndex(temple => temple.id === liveTemple.id);
    if (index !== -1) {
      data[index] = liveTemple;
    }
  });

  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

module.exports = fetchLiveUrls;