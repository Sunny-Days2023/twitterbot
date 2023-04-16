// Import dependencies
const Twit = require('twit');
const fs = require('fs').promises;
const cron = require('node-cron');

// Set up Twitter API credentials
const T = new Twit({
  consumer_key: 'e17J8HLxxcsTnwKxEdCCQxXkt',
  consumer_secret: 'Lry68A4IlJkl4XgAzupqQqyX90mV1zvWBVPnbKUnwUKa1sAkVW',
  access_token: '1482054754553368578-wCBiWGzXoPXnK2a5OEOLGjGtPAgjm1',
  access_token_secret: 'k2BXCsVtfOM1TcTBnRKBwL4qsEo8N5vxMPAHOSZV3wZIb'
});

// Read tweets from file and store in array
async function getTweetsFromFile() {
  try {
    const data = await fs.readFile('tweets.txt', 'utf8');
    return data.split('\n');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Function to select random tweet from array
function selectRandomTweet(tweets) {
  const randomIndex = Math.floor(Math.random() * tweets.length);
  return tweets[randomIndex];
}

// Function to post tweet to Twitter account
async function postTweet() {
  try {
    const tweets = await getTweetsFromFile();
    const tweet = selectRandomTweet(tweets);
    const response = await T.post('statuses/update', { status: tweet });
    console.log('Tweet posted:', tweet);
    await fs.appendFile('log.txt', `${new Date().toISOString()} - ${tweet}\n`);
  } catch (error) {
    console.error(error);
  }
}

// Set up cron job to run tweet function every hour
cron.schedule('0 0 * * *', function() {
  postTweet();
});
;
