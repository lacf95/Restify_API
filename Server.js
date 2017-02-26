'use strict';

const Restify = require('restify');
const PORT = 80;

let users = require('./userModel');
let server = Restify.createServer();
server.use(Restify.bodyParser());

server.get('/users', users.showUsers);
server.get('/users/:id', users.showUser);
server.post('/users', users.saveUser);
server.put('/users/:id', users.updateUser);
server.del('users/:id', users.deleteUser);

server.listen(PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});
