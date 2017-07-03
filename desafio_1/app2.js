var http = require('http');
var url = require('url');
var fs = require('fs');

var rotear = function(pathname) {
  if (pathname != '/') {
    var arquivo = __dirname + '/' + pathname +'.html';
    var existe = fs.existsSync(arquivo);
    if(existe){
      return arquivo;
    }
    return 'erro.html';
  }
  return 'artigos.html';
};

var server = http.createServer(function(req, res) {

  var pathname = url.parse(req.url).pathname;
  var pagina = rotear(pathname);

  fs.readFile(pagina, function(erro, html){
    res.writeHead(200, {"Content-Type:" : "text/html"});
    res.write(html);
    res.end();
  });

});

server.listen(3000, function(){
  console.log('Estou rodando.');
});
