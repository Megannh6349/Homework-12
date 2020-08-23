
USE cms_db;

INSERT INTO department (name) VALUES ("HR");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Evidence Shredding");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Execution");

INSERT into role (title, salary, department_id) VALUES ("HR Manager", 150000, 1);
INSERT into role (title, salary, department_id) VALUES ("HR Analyst", 75000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sleazy Sales Manager", 500000, 2);
INSERT into role (title, salary, department_id) VALUES ("Sleazy Sales Guy", 50000, 2);
INSERT into role (title, salary, department_id) VALUES ("Account Manager", 70000, 3);
INSERT into role (title, salary, department_id) VALUES ("Lead Shredder", 200000, 4);
INSERT into role (title, salary, department_id) VALUES ("Shredding Intern", 30000, 4);
INSERT into role (title, salary, department_id) VALUES ("Lawyer", 250000, 5);
INSERT into role (title, salary, department_id) VALUES ("Paralegal", 85000, 5);
INSERT into role (title, salary, department_id) VALUES ("Hit man", 450000, 6);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Stacey", "McQuade", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kau", "McQuade", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Salesy", "Salesman", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Rutgers", "Recruiter", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Khalil", "Brown", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Andrew", "Souza", 6, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Carlos", "Perez", 7, 6);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("James", "Newman", 8, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Matt", "Fava", 9, 8);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Reiner", "Bonsol", 9, 8);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Megan", "Henning", 10, null);
