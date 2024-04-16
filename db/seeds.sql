INSERT INTO departments (name) VALUES  
  ('Finance'),
  ('Sales'),
  ('Software');

  INSERT INTO roles (title, department_id, salary) VALUES
    ('Lawyer', 3, 10000),
    ('Office Manager', 1, 10000);

  INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Paul', 'Berkley', 'Lawyer', 'Software', 'Sue Chrysler'),
    ('Travis', 'Stewart', 'Office Manager', 'Finance', 'Christian Taylor');