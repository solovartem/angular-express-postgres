'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/users', md_auth.ensureAuth, UserController.getUsers);
api.post('/register', UserController.createUser);
api.post('/login', UserController.loginUser);
api.get('/users/:id', md_auth.ensureAuth, UserController.getUserById);
api.put('/users/:id', md_auth.ensureAuth, UserController.updateUser);
api.delete('/users/:id', md_auth.ensureAuth, UserController.deleteUser);

module.exports = api;