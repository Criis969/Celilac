CREATE DATABASE celilacdb;

USE celilacdb;

CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    surname varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT unique_person UNIQUE (email,username)
);

DESCRIBE users;

CREATE TABLE recipes(
    id int NOT NULL AUTO_INCREMENT,
    recipe_name varchar(255) NOT NULL,
    recipe_description varchar(255) NOT NULL,
    recipe_ingredients varchar(255) NOT NULL,
    duration varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    image_link varchar(255),
    user_id int NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

DESCRIBE recipes;

CREATE TABLE stores(
    id int NOT NULL AUTO_INCREMENT,
    store_name varchar(255) NOT NULL UNIQUE,
    store_type varchar(255) NOT NULL,
    google_link varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

DESCRIBE stores;