const Twit = require('twit');
const fs = require('fs');
const config = require('./../config.json');
const messages = JSON.parse(fs.readFileSync(__dirname + '/../messages.json'));

/* Client Init */
const T = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
    strictSSL: true
});

/* Get a random number + the message */
function randomLine() {
    var lineid = Math.floor(Math.random() * messages.length - 1);
    var line = messages[lineid];
    return [line];
};

/* Tweet */
function tweet() {
    var message = randomLine()
    T.post('statuses/update', { status: message }, function(err, data, response) {
        console.log("Neuer Tweet wurde verschickt");
        console.log(message);
    })
    setTimeout(tweet, config.timeout * 1000);
};

tweet();