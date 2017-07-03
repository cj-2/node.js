// Aqui estão os Controladores da página Home, a página incial da aplicação.

// Como de rotina importamoos o app para dentro do arquivo para que assim possamos
// usar suas variáveis e funções.
module.exports = function(app){

  // Estou criando a variável HomeController que recebe um objeto.
  var HomeController = {

    // Propriedade que responde ao chamado de [ app.controllers.home.index ].
    index: function(req, res){
      // Renderiza o html de home/index.
      res.render('home/index');
    },

    // || o chamado de [ app.controllers.home.login ].
    login: function(req, res){

      // Estou criando duas variaveis que recebem o valor que será puxado
      // com o req.body.usuario (em formato JSON) pelo body-parser do
      // formulário HTML passado pelo método POST.
      var email = req.body.usuario.email
        , nome = req.body.usuario.nome
      ;

      // Caso houver valores nas propriedades do objeto nome e email...
      if(email && nome){

        // Criará o uma variável usuário com os dados JSON (gerados pelo
        // body-parser) do formulário de login.
        var usuario = req.body.usuario;

        // Criará um array vazio no objeto usuário que será usado para guardar
        // os contatos do usuário da sessão.
        usuario['contatos'] = [];

        // Definirá que o valor de req.session.usuario será do objeto usuario.
        req.session.usuario = usuario;

        // E redicionará para a página url /contatos.
        res.redirect('/contatos');
      }

      // Caso não houver nenhum valor nas variáveis será redicionarado
      // para a url raiz (a mesma que já se encontra).
      else { res.redirect('/');}
    },

    // || o chamado de [ app.controllers.home.logout ].
    logout: function(req, res){

      // Destruirá a sessão e redicionará para o diretório raiz '/'.
      req.session.destroy();
      res.redirect('/');
    }
  };

  // Estou retornando o HomeController para poder usar as suas propriedades
  // com o nome do arquivo. Ex: app.controllers.home.index
  // E a reposta sera a da propriedade desse arquivo correspondente.
  return HomeController;
};
