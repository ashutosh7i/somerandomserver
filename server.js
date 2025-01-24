const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const fetchLiveUrls = require('./api/fetchLiveUrls');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/temples', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'api/data.json'), 'utf-8'));
  res.json(data);
});

// Serve static images
app.use('/api/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetchLiveUrls(); // Initial fetch
});