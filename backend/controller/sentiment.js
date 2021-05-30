const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// random (get random line from file)
const getQuote = function (quotes, comparative_score = null) {
    let l = quotes.length;
    let i = Math.floor(Math.random(0) * l);
    if (comparative_score == null) {
        // get random line and send
        return quotes[i];
    }
    // get quote based on comparative_score and end
    while (1) {
        let s = getSentiment(quotes[i]);
        i = Math.floor(Math.random(0) * l);
        let diff = Math.abs(s.comparative) - Math.abs(comparative_score);
        if (Math.abs(diff) <= 0.02) {
            console.log(quotes[i]);
            return { quote: quotes[i], score: s.comparative };
        }
    }
};

const getSentiment = function (line) {
    var result = sentiment.analyze(line);
    return { comparative: result.comparative, score: result.score };
};

// const avg = function (like, dislike) {
//     let lsum = 0;
//     let dsum = 0;
//     like.forEach(e => {
//         lsum += e;
//     });
//     dislike.forEach(e => {
//         dsum += e;
//     });
//     return (lsum - dsum) / 2;
// }

module.exports = { getQuote, getSentiment };
