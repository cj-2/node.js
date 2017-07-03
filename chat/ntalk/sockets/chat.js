module.exports = function(io){
  // Estou importando um módulo de criptografia para o arquivo, o crypto.
  // E carregando o io.sockets na variável sockets.
  var crypto = require('crypto')
    , sockets = io.sockets;

//////////

  // Estou criando uma escuta de conexão "connection" que executará um callback
  // de resposta quando o evento ocorrer.
  io.sockets.on('connection', function(client){ //////////

    // Estou criando a variável session que vai conter os dados da sessão
    // e atribuindo a usurio o valor de session.usuario.
    var session = client.handshake.session
      , usuario = session.usuario
    ;

//////////

    // Estou criando uma escuta de conexão para quando um usuário entrar em uma sala.
    client.on('join', function(sala){

      // Se nenhuma sala existir..
      if(!sala){

        // Então será maracado o tempo e criado e um hash será criado
        // na variável md5.
        var timestamp = new Date().toString()
          , md5  = crypto.createHash('md5');

        // Atribuo a sala o hash personalizado.
        sala = md5.update(timestamp).digest('hex');
      }

      // O session.sala irá receber a sala (a criada caso não exista antes).
      session.sala = sala;

      // E o cliente entra na sala.
      client.join(sala);
    });

//////////

    // Escuta do evento "disconnect".
    client.on('disconnect', function(){

      // Quando executado o disconnect o cliente abandona a sessão da sala.
      client.leave(session.sala);
    });

//////////

    // Criei uma espera "escutando" se um send-server será emitido pelo cliente
    // e então executar o callback.
    client.on('send-server', function(msg){

      // Estou definindo que sala receberá o valor de session.sala()
      // e criando uma variável data que receberá um objeto com o
      // o email e usuario do cliente.
      var sala = session.sala
        , data = { email: usuario.email, sala: sala };

      // Recebe os dados da mensagem do cliente (msg) e as formata em uma variavel
      // para depois emitilas para o cliente e os outros usuarios da conversa.
      var msg = "<b>" + usuario.nome + " </b>" + msg + "<br>";

      // Emite uma mensagem para o usuario chamado com os parâmetros para a URL
      // da conversa, email e sala.
      client.broadcast.emit('new-message', data);

      // Emitindo a mensagem para os usuários(sockets) dentro da sala.
      sockets.in(sala).emit('send-client', msg);

    });

//////////

  });
};
