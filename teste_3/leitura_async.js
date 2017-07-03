var fs = require('fs');
var leituraAsync = function(arquivo) {
  console.log('Fazendo leitura Assíncrona.');
  var inicio = new Date().getTime();
  fs.readFile(arquivo);
  var fim = new Date().getTime();
  console.log(inicio +" "+ fim);

};

module.exports = leituraAsync;
