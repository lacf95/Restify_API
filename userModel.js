'use strict';

let users = [];
let searchedUser = 0;

exports.saveUser = (req, resp, next) => {
  users.push({
    id: req.params.id,
    firstName: req.params.firstName,
    lastName: req.params.lastName,
    email: req.params.email,
    password: req. params.password
  });
  resp.send(201);
  next();
}

exports.showUsers = (req, resp, next) => {
  resp.send(200, users.map(hideSensibleData));
  next();
}

exports.showUser = (req, resp, next) => {
  searchedUser = req.params.id;
  let selectedUser = hideSensibleData(users.find(findUser));
  if (selectedUser)
    resp.send(200, selectedUser);
  else
    resp.send(404);
}

exports.updateUser = (req, resp, next) => {
  searchedUser = req.params.id;
  let selectedUser = users.find(findUser);
  if (selectedUser) {
    users[users.indexOf(selectedUser)] = {
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      email: req.params.email,
      password: req.params.password
    }
    resp.send(201);
  }
  else
    resp.send(404);
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
