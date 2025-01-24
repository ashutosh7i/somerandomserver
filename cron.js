const cron = require('node-cron');
const fetchLiveUrls = require('./api/fetchLiveUrls');

cron.schedule('0 6 * * *', fetchLiveUrls); // 6 AM
cron.schedule('0 18 * * *', fetchLiveUrls); // 6 PM

console.log('Cron jobs scheduled to fetch live URLs at 6 AM and 6 PM.');