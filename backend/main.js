const fs=require('fs-extra');
const readline=require('readline');
const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;
const analyzer = new Analyzer("English", null, "afinn");

const reader=readline.createInterface({
   input:fs.createReadStream('./train.txt'),
   output: null,
   console:false
});

let c=0;
reader.on('line',(line)=>{
   if(c==100) process.exit(0);
   let tok=line.split(" ");
   let score=analyzer.getSentiment(tok);
   console.log(`${c})${score}`);
   c+=1;
});
