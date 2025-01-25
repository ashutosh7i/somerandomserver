const cron = require('node-cron');
const fetchLiveUrls = require('./api/fetchLiveUrls');

// Schedule cron jobs to refresh 5 times a day
cron.schedule('34 3 * * *', fetchLiveUrls); // 3:30 AM (half an hour before 4:00 AM aarti)
cron.schedule('30 6 * * *', fetchLiveUrls); // 6:30 AM (half an hour before 7:00 AM aarti)
cron.schedule('30 9 * * *', fetchLiveUrls); // 9:30 AM (half an hour before 10:00 AM aarti)
cron.schedule('30 16 * * *', fetchLiveUrls); // 4:30 PM (half an hour before 5:00 PM aarti)
cron.schedule('30 18 * * *', fetchLiveUrls); // 6:30 PM (half an hour before 7:00 PM aarti)

console.log('Cron jobs scheduled to fetch live URLs at 6 AM and 6 PM.');