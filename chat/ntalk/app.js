// Nesse bloco a aplicação importa os modulos que a aplicação precisa.
const KEY = 'ntalk.sid', SECRET = 'ntalk';
var express = require('express')
  , load = require('express-load')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , expressSession = require('express-session')
  , methodOverride = require('method-override')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
  , cookie = cookieParser(SECRET)
  , store = new expressSession.MemoryStore()
;

// Nesse  eu defino
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(expressSession({
  secret: SECRET,
  name: KEY,
  resave: true,
  saveUninitialized: true,
  store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));


io.use(function(socket, next){

  // Estou criando uma variavel com os dados "data" que irei precisar.
  var data = socket.request;

  cookie(data, {}, function(err){

    // Estou definindo qual  é o ID da sessão.
    var sessionID = data.signedCookies[KEY];

    // Estou buscando os dados da sessão que estão na memória do servidor.
    store.get(sessionID, function(err, session){

      // Se ocorrer um erro ou não existir a sessão...
      if(err || !session){
        // Executamos o next() passando como parâmetro um objeto de erro.
        return next(new Error('acesso negado.'))
      }

      else{
        // Se existir e nada de errado acontecer o socket "aperta as mãos"
        // e inclui os dados da sessão na variável socket.handshake.session.
        socket.handshake.session = session;

        // E então liberamos a conexão com o next();
        return next();
      }

    });
  });
});


load('models')
  .then('controllers')
  .then('routes')
.into(app);

load('sockets')
  .into(io);

server.listen(3000, function(){
  console.log('Ntalk subiu a montanha!');
});
