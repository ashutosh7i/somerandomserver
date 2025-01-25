// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');

// // API key for accessing YouTube Data API
// const API_KEY = 'AIzaSyAh4PtE9y4aqGPmKY7SObta-BVJ7bgYs08';

// // Path to the data file
// const dataFilePath = path.join(__dirname, 'data.json');

// // Function to fetch live URLs for temples
// const fetchLiveUrls = async () => {
//   console.log('Reading data file...');
//   // Read and parse the data file
//   const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

//   console.log('Filtering live temples...');
//   // Filter temples that have live streams
//   const liveTemples = data.filter(temple => temple.live);

//   console.log('Mapping live temples to their channel information...');
//   // Map live temples to their channel information
//   const channels = liveTemples.map(temple => ({
//     channelId: temple.streamInfo.channelId,
//     title: temple.streamInfo.title
//   }));

//   // Function to fetch videos from YouTube Data API
//   const fetchVideos = async (channelId, eventType, results = 1) => {
//     const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&type=video&eventType=${eventType}&maxResults=${results}&part=snippet&order=date`;
//     console.log(`Fetching videos for channel ${channelId} with event type ${eventType}...`);
//     const response = await axios.get(url);
//     console.log(`Response data for channel ${channelId}:`, response.data);
//     return response.data.items || [];
//   };

//   // Function to match video titles with a given title segment
//   const matchTitle = (videos, titleSegment) => {
//     const regex = new RegExp(titleSegment, 'i');
//     console.log(`Matching videos with title segment: ${titleSegment}`);
//     return videos.find((video) => regex.test(video.snippet.title));
//   };

//   // Function to process each channel and find the appropriate video
//   const processChannel = async (channel) => {
//     const { channelId, title } = channel;
//     console.log(`Processing channel: ${channelId}, Title: ${title}`);

//     try {
//       if (title) {
//         // Fetch more results to filter by title
//         console.log(`Fetching live videos for channel ${channelId}...`);
//         let videos = await fetchVideos(channelId, 'live', 5);
//         let matchedVideo = matchTitle(videos, title);

//         if (!matchedVideo) {
//           // No matching live stream, try completed streams
//           console.log(`No matching live stream found. Fetching completed videos for channel ${channelId}...`);
//           videos = await fetchVideos(channelId, 'completed', 5);
//           matchedVideo = matchTitle(videos, title);
//         }

//         return matchedVideo || null;
//       } else {
//         // Fetch the latest live or completed video
//         console.log(`Fetching the latest live video for channel ${channelId}...`);
//         let videos = await fetchVideos(channelId, 'live', 1);
//         if (videos.length > 0) return videos[0];

//         // If no live video, fallback to completed
//         console.log(`No live video found. Fetching the latest completed video for channel ${channelId}...`);
//         videos = await fetchVideos(channelId, 'completed', 1);
//         return videos.length > 0 ? videos[0] : null;
//       }
//     } catch (error) {
//       console.error(`Error fetching streams for channel ${channelId}:`, error);
//       return null;
//     }
//   };

//   console.log('Processing all channels...');
//   // Process all channels and fetch their streams
//   const streams = await Promise.all(channels.map((channel) => processChannel(channel)));

//   console.log('Updating live URLs for the temples...');
//   // Update live URLs for the temples
//   streams.forEach((stream, index) => {
//     if (stream) {
//       console.log(`Updating live URL for temple ${liveTemples[index].name}...`);
//       liveTemples[index].liveUrl = `https://www.youtube.com/embed/${stream.id.videoId}`;
//     }
//   });

//   console.log('Writing updated data back to the file...');
//   // Update the data file with new live URLs
//   liveTemples.forEach(liveTemple => {
//     const index = data.findIndex(temple => temple.id === liveTemple.id);
//     if (index !== -1) {
//       data[index] = liveTemple;
//     }
//   });

//   // Write the updated data back to the file
//   fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
//   console.log('Data file updated successfully.');
// };

// // Export the fetchLiveUrls function
// module.exports = fetchLiveUrls;


const axios = require('axios');
const fs = require('fs');
const path = require('path');

// API key for accessing YouTube Data API
const API_KEY = 'AIzaSyB9shc4Sc1ET2sfCWAnHm8K9GYjSKD5z0s';

// Path to the data file
const dataFilePath = path.join(__dirname, 'data.json');

// Function to fetch live URLs for temples
const fetchLiveUrls = async () => {
  console.log('Reading data file...');
  // Read and parse the data file
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

  console.log('Filtering live temples...');
  // Filter temples that have live streams
  const liveTemples = data.filter(temple => temple.live);

  console.log('Mapping live temples to their channel information...');
  // Map live temples to their channel information
  const channels = liveTemples.map(temple => ({
    channelId: temple.streamInfo.channelId,
    title: temple.streamInfo.title
  }));

  // Function to fetch videos from YouTube Data API
  const fetchVideos = async (channelId, eventType, results = 1) => {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&type=video&eventType=${eventType}&maxResults=${results}&part=snippet&order=date`;
    console.log(`Fetching videos for channel ${channelId} with event type ${eventType}...`);
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    console.log(`Response data for channel ${channelId}:`, response.data);
    return response.data.items || [];
  };

  // Function to match video titles with a given title segment
  const matchTitle = (videos, titleSegment) => {
    const regex = new RegExp(titleSegment, 'i');
    console.log(`Matching videos with title segment: ${titleSegment}`);
    return videos.find((video) => regex.test(video.snippet.title));
  };

  // Function to process each channel and find the appropriate video
  const processChannel = async (channel) => {
    const { channelId, title } = channel;
    console.log(`Processing channel: ${channelId}, Title: ${title}`);

    try {
      if (title) {
        // Fetch more results to filter by title
        console.log(`Fetching live videos for channel ${channelId}...`);
        let videos = await fetchVideos(channelId, 'live', 5);
        let matchedVideo = matchTitle(videos, title);

        if (!matchedVideo) {
          // No matching live stream, try completed streams
          console.log(`No matching live stream found. Fetching completed videos for channel ${channelId}...`);
          videos = await fetchVideos(channelId, 'completed', 5);
          matchedVideo = matchTitle(videos, title);
        }

        return matchedVideo || null;
      } else {
        // Fetch the latest live or completed video
        console.log(`Fetching the latest live video for channel ${channelId}...`);
        let videos = await fetchVideos(channelId, 'live', 1);
        if (videos.length > 0) return videos[0];

        // If no live video, fallback to completed
        console.log(`No live video found. Fetching the latest completed video for channel ${channelId}...`);
        videos = await fetchVideos(channelId, 'completed', 1);
        return videos.length > 0 ? videos[0] : null;
      }
    } catch (error) {
      console.error(`Error fetching streams for channel ${channelId}:`, error);
      return null;
    }
  };

  console.log('Processing all channels...');
  // Process all channels and fetch their streams
  const streams = await Promise.all(channels.map((channel) => processChannel(channel)));

  console.log('Updating live URLs for the temples...');
  // Update live URLs for the temples
  streams.forEach((stream, index) => {
    if (stream) {
      console.log(`Updating live URL for temple ${liveTemples[index].name}...`);
      liveTemples[index].liveUrl = `https://www.youtube.com/embed/${stream.id.videoId}`;
    }
  });

  console.log('Writing updated data back to the file...');
  // Update the data file with new live URLs
  liveTemples.forEach(liveTemple => {
    const index = data.findIndex(temple => temple.id === liveTemple.id);
    if (index !== -1) {
      data[index] = liveTemple;
    }
  });

  // Write the updated data back to the file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  console.log('Data file updated successfully.');
};

// Export the fetchLiveUrls function
module.exports = fetchLiveUrls;