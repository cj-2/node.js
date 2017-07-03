var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  var imprimePagina = function(erro, html){
    res.writeHead(200, {"Content-Type:" : "text/html"});
    res.write(html);
    res.end();
  };

  var endereco = url.parse(req.url);
  var existePag = fs.existsSync(__dirname + '/' + endereco.href + '.html');

  if(endereco.path == '/'){
    fs.readFile(__dirname + '/artigos.html', imprimePagina);
  }

  else if (existePag){
    fs.readFile(__dirname + endereco.path + '.html', imprimePagina);
  }

  else {
    fs.readFile(__dirname + '/erro.html', imprimePagina);
  }
});

server.listen(3000, function(){
  console.log("Rodando.");
});
