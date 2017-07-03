var fs = require('fs');
var leituraSync = function(arquivo) {
  console.log('Fazendo leitura Síncrona.');
  var inicio = new Date().getTime();
  fs.readFileSync(arquivo);
  var fim = new Date().getTime();
  console.log(inicio +" "+ fim);

};

module.exports = leituraSync;
