DROP DATABASE IF EXISTS employee_tracker_db;
-- Creates the "employee_tracker_db" database --
CREATE DATABASE employee_tracker_db;

-- Makes it so all of the following code will affect employee_tracker_db --
--\c employee_tracker_db;


-- Creates user table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Creates department table
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Creates roles table
CREATE TABLE roles (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    salary DECIMAL,
    department_id INT
);

-- Creates employees table
CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT,
    manager_id INT
);