const db = require('./config/connection');
const consTab = require('console.table');

// Class for doing various CRUD functions on the tracker database
class TrackerCRUD {

    // View all departments. name, id
    static viewDepartments() {

    }

    // View all roles. title, id, dept name, salary
    static viewRoles() {

    }

    // View all employes. id, firstName, lastName, jobTitle, dept, salary, managers
    static viewEmployees() {

    }

    // Adds a department
    static addDept(name) {

    }

    // Adds a role
    static addRole(title, salary, deptID) {

    }

    // Adds an employee
    static addEmployee(firstName, lastName, roleID, managerID) {

    }

    // Update employee role
    static updateEmployeeRole(employeeID, roleID) {

    }

    // Prints an array as a table in the console
    static printAsTable(data) {

    }


}

module.exports = TrackerCRUD;