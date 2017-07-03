var fs = require('fs');

for (var i = 0; i < 5; i++) {
  var file = "sync-text" + i + ".txt";
  var out =  fs.writeFileSync(file, "Hello Node.js!");
  console.log(out);
}
