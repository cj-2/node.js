module.exports = function(app){
  var ChatController = {
    index: function(req, res){
      // Envia uma query string do ID da sala se presente na URL.
      var params = { sala: req.query.sala };
      // E renderiza o arquivo HTML de chat/index.
      res.render('chat/index', params);
    }
  };
  return ChatController;
};
