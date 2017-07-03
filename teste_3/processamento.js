var http = require('http');
var fs = require('fs');

var leituraAsync = require('./leitura_async');
var leituraSync = require('./leitura_sync');

var arquivo = './index.html';

var stream = fs.createWriteStream(arquivo);
var download = 'http://emptybits.com.br/index.html';

http.get(download, function(res){
  console.log('Fazendo dowload do node.js');
  res.on('data', function(data){
    stream.write(data);
  });
  res.on('end', function(){
    stream.end();
    console.log('Dowload finalizado.');
    leituraAsync(arquivo);
    leituraSync(arquivo);


  });
});
