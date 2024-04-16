INSERT INTO departments (department_name) VALUES  
  ('Finance'),
  ('Sales'),
  ('Software');

  INSERT INTO roles (title, department_id, salary) VALUES
    ('Lawyer', 3, 10000),
    ('Office Manager', 1, 10000);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Paul', 'Berkley', 1, NULL),
('Travis', 'Stewart', 2, NULL);