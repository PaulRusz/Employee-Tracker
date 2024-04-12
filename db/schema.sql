DROP DATABASE IF EXISTS employees_db;
-- Creates the "employees_db" database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect employees_db --
\c employees_db;


-- Creates user table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255)
);

-- Creates department table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Creates employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Creates roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);