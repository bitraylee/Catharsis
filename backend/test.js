var fs = require('fs');
var readline = require('readline');
var read_stream = fs.createReadStream("train.txt");
var rl = readline.createInterface({
   input: read_stream   
});

let c=0;
rl.on('line',function(line){
   if(c==100) return;
   console.log(`> ${line}`);
   c+=1;
}).on('close',function(){
   rl.close();
});
