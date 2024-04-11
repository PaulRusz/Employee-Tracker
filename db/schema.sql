
--  Creates user table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255)
);

-- creates department table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);