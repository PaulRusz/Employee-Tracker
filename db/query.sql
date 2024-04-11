

-- Adds department query
INSERT INTO departments (name) VALUES ($1);


-- Adds role query
INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);


-- Adds employee query
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)