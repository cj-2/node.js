var http = require('http');

var respostaRequisicao = function(request, response){
  response.writeHead(200, {"Content-Type:" : "text/html"});
  if (request.url == "/") {
    response.write("<h1>E ai, gostou do servidor?</h1> <p>Foi bem feito, não?</p>");
  }
  else if (request.url == "/bemvindo" ) {
    response.write("<h1>Bem vindo!</h1> <p>Você está na página de boas vindas.</p>");
  }
  else{
    response.write("<h1>Parece que ocorreu um erro...</h1><p>Talvez com uma tetris possa encontrar o conteudo que existiu aqui.</p>")
  }
    console.log('Estão me acessando.');
    response.end();
}

var server = http.createServer(respostaRequisicao);

server.listen(3000, function(){
  console.log('Servidor Hello Word rodando.');
});
