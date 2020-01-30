CREATE DATABASE abc;

\l

\c abc;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256),
    email VARCHAR(256),
    password VARCHAR(2048)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256),
    categorie VARCHAR(256),
    place VARCHAR(256),
    address VARCHAR(256),
    date_start VARCHAR(256),
    date_end VARCHAR(256),
    type_event VARCHAR(256)
);

\dt

select * from users;
