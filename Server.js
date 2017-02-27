'use strict';

const Restify = require('restify');
const Models = require('./models/index');
const PORT = 80;

let server = Restify.createServer();
server.use(Restify.bodyParser());

server.get('/users', Models.Users.showUsers);
server.get('/users/:id', Models.Users.showUser);
server.post('/users', Models.Users.saveUser);
server.put('/users/:id', Models.Users.updateUser);
server.del('users/:id', Models.Users.deleteUser);

server.listen(PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});
