use tracker_db;
INSERT INTO department (name) 
VALUES ("Sales"),
        ("Accounting"),
        ("Engineering");

INSERT INTO role (title, salary, department_id) 
VALUES ("Sales Rep", 50000, 1),
        ("Sales Executive", 100000, 1),
        ("Cost Accountant", 50000, 2),
        ("CFO", 120000, 2),
        ("Junior Engineer", 80000, 3),
        ("Senior Engineer", 110000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Bellamy", 5, 2),
        ("Joe", "Joseph", 6, null),
        ("John", "Johnson", 2, null),
        ("Ed", "Edwards", 1, 3),
        ("Sylvia", "Sylvain", 4, null),
        ("Henrietta", "Henry", 3, 5);


