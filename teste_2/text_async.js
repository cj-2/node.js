var fs = require('fs');

for (var i = 0; i < 5; i++) {
  var file = "async-text" + i + ".txt";
  var out =  fs.writeFile(file, "Hello Node.js!", function(err, out) {
    console.log(out);
  });
  console.log(out);
}
