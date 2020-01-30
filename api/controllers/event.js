'use strict'

var pool = require('../database/connection');


async function getEvents(req, res) {
    var query = await pool.query('SELECT * FROM events ORDER BY id ASC');
    res.status(200).json(query.rows);
};

async function getEventById(req, res) {
    var id = parseInt(req.params.id);
    var query = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    var event = query.rows[0]
    if (event) {
        res.status(200).json({event: event});
    } else {
        res.status(404).json({message: 'El evento no existe !!'});
    }
};

async function createEvent(req, res) {
    var event = {};
    var params = req.body;

    event.name = params.name;
	event.categorie = params.categorie;
	event.place = params.place;
	event.address = params.address;
	event.date_start = params.date_start;
	event.date_end = params.date_end;
	event.type_event = params.type_event;

    var query = await pool.query('INSERT INTO events (name, categorie, place, address, date_start, date_end, type_event) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
        event.name,
        event.categorie,
        event.place,
        event.address,
        event.date_start,
        event.date_end,
        event.type_event
    ]);
    
    res.status(200).json({event: event});

};

async function  updateEvent(req, res) {
    var id = parseInt(req.params.id);
    var event = {};
    var params = req.body;

    event.name = params.name;
	event.categorie = params.categorie;
	event.place = params.place;
	event.address = params.address;
	event.date_start = params.date_start;
	event.date_end = params.date_end;
	event.type_event = params.type_event;

    var query = await pool.query('UPDATE events SET name = $1, categorie = $2, place = $3, address = $4, date_start = $5, date_end = $6, type_event = $7 WHERE id = $8', [
        event.name,
        event.categorie,
        event.place,
        event.address,
        event.date_start,
        event.date_end,
        event.type_event,
        id
    ]);
    res.status(200).json({message: 'El evento se actulizo con exito !!'});
};

async function deleteEvent(req, res) {
    var id = parseInt(req.params.id);
    await pool.query('DELETE FROM events where id = $1', [id]);
    res.status(200).json({message: `El evento ${id} se elemino con exito !!`});
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};