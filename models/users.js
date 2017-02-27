'use strict';

let users = [{
  id: 1,
  firstName: 'Adrian',
  lastName: 'Chavez',
  email: 'lchavez1@ucol.mx',
  password: '123'
}];
let searchedUser = 0;
let count = 1;

exports.saveUser = (req, resp, next) => {
  if (req.params.email && req.params.password) {
    users.push({
      id: ++count,
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      email: req.params.email,
      password: req. params.password
    });
    resp.send(201);
  } else
    resp.send(404);
  next();
}

exports.showUsers = (req, resp, next) => {
  resp.send(200, users.map(hideSensibleData));
  next();
}

exports.showUser = (req, resp, next) => {
  searchedUser = parseInt(req.params.id);
  let selectedUser = hideSensibleData(users.find(findUser));
  if (selectedUser)
    resp.send(200, selectedUser);
  else
    resp.send(404);
  next();
}

exports.updateUser = (req, resp, next) => {
  searchedUser = parseInt(req.params.id);
  let selectedUser = users.find(findUser);
  if (selectedUser) {
    users[users.indexOf(selectedUser)] = {
      id: searchedUser,
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      email: req.params.email,
      password: req.params.password
    }
    resp.send(201);
  }
  else
    resp.send(404);
  next();
};

exports.deleteUser = (req, resp, next) => {
  searchedUser = req.params['id'];
  let selectedUser = users.find(findUser);
  if (selectedUser) {
    users.splice(users.indexOf(selectedUser), 1);
    resp.send(204);
  }
  else
    resp.send(404);
  next();
};

function hideSensibleData(user) {
  if (user)
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
  else
    return null;
}

function findUser(user) {
  return user.id === searchedUser;
}
