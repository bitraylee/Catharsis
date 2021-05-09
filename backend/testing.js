const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const fs=require('fs-extra');
const readline=require('readline');

const reader=readline.createInterface({
   input:fs.createReadStream('./train.txt'),
   output: null,
   console:false
});

let c=0;
reader.on('line',(line)=>{
   if(c==100) process.exit(0);
   if(line.length<300){
      var result = sentiment.analyze(line);
      if(result.comparative<0.1 && result.comparative>-0.5){
         console.log(`>${line}`);
         console.log(result.comparative);
         c+=1;
      }
   }
});

// const txt=process.argv.slice(2)[0];
// var res=sentiment.analyze(txt);
// console.log(res);
