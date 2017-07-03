var fs = require('fs');
var lerDiretorio = function() {
  fs.readdir(__dirname, function(erro, diretorio){
    if (erro) { throw erro; }
    diretorio.forEach(function(arquivo){
      ler(arquivo);
    });
  });
};
var ler = function(arquivo){
  var path = './' + arquivo;
  fs.stat(path, function(erro, stat){
    if (erro) { throw erro; }
    if (stat.isFile()){
      console.log('%s %d bytes', arquivo, stat.size);
    }
  });
};
lerDiretorio();
