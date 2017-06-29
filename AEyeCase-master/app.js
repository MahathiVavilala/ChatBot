var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
   session.send("Hello, I'am AEye")
   //session.send(" %s", session.message.text);

});



/*
var bot = new builder.UniversalBot(connector);

// send simple notification
function sendProactiveMessage(address) {
  var msg = new builder.Message().address(address);
  msg.text('Hello, I am AEye');
  msg.textLocale('en-US');
  bot.send(msg);
}

var savedAddress;
server.post('/api/messages', connector.listen());

// Do GET this endpoint to delivey a notification
server.get('/api/CustomWebApi', (req, res, next) => {
    sendProactiveMessage(savedAddress);
    res.send('triggered');
    next();
  }
);

// root dialog
//bot.dialog('/', function(session, args) {

  //savedAddress = session.message.address;

 //var message = 'Hello! In a few seconds I\'ll send you a message proactively to demonstrate how bots can initiate messages.';
  //session.send(message);
  
 // message = 'You can also make me send a message by accessing: ';
  //message += 'http://localhost:' + server.address().port + '/api/CustomWebApi';
  //session.send(message);

  /*setTimeout(() => {
   sendProactiveMessage(savedAddress);
  }, 5000);
});
*/