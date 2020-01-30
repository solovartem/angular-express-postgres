'use strict'

var express = require('express');
var EventController = require('../controllers/event');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/events', md_auth.ensureAuth, EventController.getEvents);
api.get('/events/:id', md_auth.ensureAuth, EventController.getEventById);
api.post('/events', md_auth.ensureAuth, EventController.createEvent);
api.put('/events/:id', md_auth.ensureAuth, EventController.updateEvent);
api.delete('/events/:id', md_auth.ensureAuth, EventController.deleteEvent);

module.exports = api;