const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000;
const cors = require('cors');
var fs = require('fs');
var readline = require('readline');
const { getSentiment, avg, getQuote } = require('./controller/sentiment');

let liked = 0;
let count = 0;
const quotes = [];

app.use(cors());
app.use(express.json());

//random quotes
app.get('/quote', (req, res) => {
    let quote = getQuote(quotes);
    let score = getSentiment(quote).comparative;
    res.send({ quote: quote, score: score });
});

// swipe action
app.get('/quote/:action', (req, res) => {
    const action = req.params.action;
    const score = +(req.query.s) || -0.01;
    if (action !== "left") {
        liked += score;
        count += 1;
    }
    let x = liked/count;
    console.log({ action, score, x });
    let newquote = getQuote(quotes, x);
    res.send(newquote);
});

let c = 0;
var read_stream = fs.createReadStream("train.txt");
var rl = readline.createInterface({
    input: read_stream
});
rl.on('line', function (line) {
    if (c == 200) return;
    if (line.length < 200) {
        quotes.push(line);
        c += 1;
    }
}).on('close', function () {
    rl.close();
    console.log('quotes loaded');
    // start server
    app.listen(PORT, () => {
        console.log(`>${PORT}<`);
    });
});
