var http = require('http');

var respostaRequisicao = function(request, response){
  response.writeHead(200, {"Content-Type:" : "text/html"});
  response.write("<h1>Servidor Hello Word rodando.");
  console.log('Estão me acessando.');
  response.end();
}

var server = http.createServer(respostaRequisicao);

server.listen(3000, function(){
  console.log('Servidor Hello Word rodando.');
});
