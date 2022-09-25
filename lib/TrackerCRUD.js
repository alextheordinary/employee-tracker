const db = require('../config/connection');
const consTab = require('console.table');

// Class for doing various CRUD functions on the tracker database
class TrackerCRUD {

    // View all departments. name, id
    static viewDepartments() {
       return db.promise().query('SELECT name, id FROM department');
    }

    // View all roles. title, id, dept name, salary
    static viewRoles() {
        return db.promise().query('SELECT title, role.id AS id, department.name AS dept_name, salary FROM role JOIN department ON role.department_id = department.id');
    }

    // View all employes. id, firstName, lastName, jobTitle, dept, salary, managers
    static viewEmployees() {
        return db.promise().query(`SELECT employee.id AS id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT OUTER JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id`);
    }

    // Adds a department
    static addDept(name) {
        db.promise().query(`INSERT INTO department (name) VALUES(?)`, [name]);
    }

    // Adds a role
    static addRole(title, salary, deptID) {
        db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)`, [title, salary, deptID]);
    }

    // Adds an employee
    static addEmployee(firstName, lastName, roleID, managerID) {
        db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, roleID, managerID]);
    }

    // Update employee role
    static updateEmployeeRole(employeeID, roleID) {
        db.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleID, employeeID]);
    }

    // Prints an array as a table in the console
    static printAsTable(data) {
        console.table(data);
    }

    // Close the connection
    static closeDB() {
        db.end();
    }


}

module.exports = TrackerCRUD;