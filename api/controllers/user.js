'use strict'

var pool = require('../database/connection');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

async function getUsers(req, res) {
    var response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(response.rows);
};

async function getUserById(req, res) {
    var id = parseInt(req.params.id);
    var query = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    var user = query.rows[0]
    if (user) {
        res.status(200).json({user: user});
    } else {
        res.status(404).json({message: 'El usuario no existe !!'});
    }
};

function createUser(req, res) {
    var user = {}
    var params = req.body;

    user.name = params.name;
	user.email = params.email;

    if(params.password) {
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
			if(user.name != null && user.email != null) { 
                const userStored = pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [user.name, user.email, user.password]);
                res.status(200).send({user: user});
            } else {
			    res.status(200).send({message: 'Rellena todos los campos'});
            }
        })
    } else {
		res.status(200).send({message: 'Introduce la contraseña'});
	}
};

async function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    var query = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    var user = query.rows[0];
    // console.log(user)
    if(!user){
        res.status(404).send({message: 'El usuario no existe'});
    } else {
        bcrypt.compare(password, user.password, function(err, check){
            if(check){
                res.status(200).send({
                    id: user.id,
                    token: jwt.createToken(user),
                    usuario: user
                });
            }else{
                res.status(404).send({message: 'El usuario no ha podido loguease'});
            }
        });
    }

};

async function  updateUser(req, res) {
    var id = parseInt(req.params.id);
    var user = {};
    var params = req.body;

    user.name = params.name;
	user.email = params.email;

    var query = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        user.name,
        user.categorie,
        id
    ]);
    res.status(200).json({message: 'El usuario se actulizo con exito !!'});
};

async function deleteUser(req, res) {
    var id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [id]);
    res.status(200).json({message: `El usuario ${id} se elemino con exito !!`});
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    loginUser,
    updateUser,
    deleteUser
};