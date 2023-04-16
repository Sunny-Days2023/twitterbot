// Import dependencies
const Twit = require('twit');
const fs = require('fs');
const cron = require('node-cron');

// Set up Twitter API credentials
const T = new Twit({
  consumer_key: 'e17J8HLxxcsTnwKxEdCCQxXkt',
  consumer_secret: 'Lry68A4IlJkl4XgAzupqQqyX90mV1zvWBVPnbKUnwUKa1sAkVW',
  access_token: '1482054754553368578-wCBiWGzXoPXnK2a5OEOLGjGtPAgjm1',
  access_token_secret: 'k2BXCsVtfOM1TcTBnRKBwL4qsEo8N5vxMPAHOSZV3wZIb'
});

// Read tweets from file and store in array
const tweets = fs.readFileSync('tweets.txt', 'utf8').split('\n');

// Function to select random tweet from array
function selectRandomTweet() {
  const randomIndex = Math.floor(Math.random() * tweets.length);
  return tweets[randomIndex];
}

// Function to post tweet to Twitter account
function postTweet() {
  const tweet = selectRandomTweet();
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Tweet posted:', tweet);
      fs.appendFile('log.txt', `${new Date().toISOString()} - ${tweet}\n`, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

// Set up cron job to run tweet function every hour
cron.schedule('0 0 * * *', function() {
  postTweet();
});
