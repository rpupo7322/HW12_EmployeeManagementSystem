DROP DATABASE IF EXISTS employeeTracker;

CREATE DATABASE employeeTracker;

USE employeeTracker;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,4) NULL,
  department_id int NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
  role_id INT NULL,
manager_id Int NULL,
  PRIMARY KEY (id)
);

insert into department (id, name)
values (1, 'Legal'), (2, 'Sales'), (3, 'Engineering') , (4, 'Finance');

insert into role (id, title, salary, department_id)
values (1, 'Sales Lead', 100000, 2), (2, 'Sales Person', 80000, 2 ), (3, 'Lead Engineer', 190000, 3)
, (4, 'Software Engineer', 120000, 3), (5, 'Legal Team Lead', 250000, 1), (6, 'Lawyer', 70000, 1)
, (7, 'Accountant', 100000, 4);

insert into employee (first_name, last_name, role_id, manager_id)
values ('John', 'Doe', 1, 3), ('Mike', 'Chan', 1, 1), ('Ashley', 'Rodriguez', 3, null)
, ('Kevin', 'Tupik', 4, 3), ('Malia', 'Brown', 7, null), ('Sarah', 'Lourd', 5, null)
, ('Tom', 'Allen', 6, 6), ('Christian', 'Eckenrode', 3, 2)