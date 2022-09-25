const inquirer = require('inquirer');
const { viewDepartments, addRole } = require('./TrackerCRUD');
const TrackerCRUD = require('./TrackerCRUD');

class TrackerCLI {

    /* Main menu method. Has the following options:
        View all departments
        View all roles
        View all employees
        Add a department
        Add a role
        Add an employee
        Update an employee role
       
       Calls functions based on answers.action
    */
    static async mainMenu() {
        const answers = await inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Choose action:',
                    name: 'action',
                    choices: [
                        { name: "View all departments", value: "viewDepts" },
                        { name: "View all roles", value: "viewRoles" },
                        { name: "View all employees", value: "viewEmployees" },
                        { name: "Add a department", value: "addDept" },
                        { name: "Add a role", value: "addRole" },
                        { name: "Add an employee", value: "addEmployee" },
                        { name: "Update an employee role", value: "updateEmpRole" },
                        { name: "Exit", value: "exit" },
                    ]
                }
            ]);
        switch (answers.action) {
            case "viewDepts": {
                const [rows, fields] = await TrackerCRUD.viewDepartments();
                TrackerCRUD.printAsTable(rows);
                this.mainMenu();
                break;
            }
            case "viewRoles": {
                const [rows, fields] = await TrackerCRUD.viewRoles();
                TrackerCRUD.printAsTable(rows);
                this.mainMenu();
                break;
            }
            case "viewEmployees": {
                const [rows, fields] = await TrackerCRUD.viewEmployees();
                TrackerCRUD.printAsTable(rows);
                this.mainMenu();
                break;
            }
            case "addDept": {
                this.addDeptMenu();
                break;
            }
            case "addRole": {
                const [rows, fields] = await TrackerCRUD.viewDepartments();
                this.addRoleMenu(rows);
                break;
            }
            case "addEmployee": {
                const [rows_emp, fields_emp] = await TrackerCRUD.viewEmployees();
                const [rows_role, fields_row] = await TrackerCRUD.viewRoles();
                this.addEmployeeMenu(rows_role, rows_emp);
                break;
            }
            case "updateEmpRole": {
                const [rows_emp, fields_emp] = await TrackerCRUD.viewEmployees();
                const [rows_role, fields_row] = await TrackerCRUD.viewRoles();
                this.updateEmployeeRoleMenu(rows_emp, rows_role);
                break;
            }
            case "exit": {
                TrackerCRUD.closeDB();
                break;
            }
        }
    }

    // Add department menu method. Ask for a department name and then returns that department name  

    static async addDeptMenu() {
        const answers = await inquirer
            .prompt([
                {
                    type: 'input',
                    message: "Department name?",
                    name: 'dept'
                },
            ])
        let deptName = answers.dept.trim();
        TrackerCRUD.addDept(deptName);
        this.mainMenu();
    }

    // Add role menu method. depts is an array of {deptName, id} objects. Asks for role name, role salary, and provides a list of departments to choose from. Returns an array containing [Role name, salary, deptID]

    static async addRoleMenu(depts) {
        let deptChoices = [];
        depts.forEach(element => {
            deptChoices.push({ name: element.name, value: element.id });
        });
        const answers = await inquirer
            .prompt([
                {
                    type: 'input',
                    message: "Role title?",
                    name: 'role'
                },
                {
                    type: 'number',
                    message: "Salary?",
                    name: 'salary'
                },
                {
                    type: 'list',
                    message: 'Choose department:',
                    name: 'dept',
                    choices: deptChoices
                }
            ]);
        let roleName = answers.role.trim();
        let salary = answers.salary;
        let deptID = answers.dept;
        TrackerCRUD.addRole(roleName, salary, deptID);
        this.mainMenu();
    }

    // Add employee menu. roles is an array of {roleName, id} objects. employees is an array of {firstname, lastName, id} objects. Asks for first name and last name. Role and manager are chosen from lists. Returns an array containing [firstName, lastName, roleID, managerID]

    static async addEmployeeMenu(roles, employees) {
        let roleChoices = [];
        let managerChoices = [{ name: "None", value: null }];
        roles.forEach(element => {
            roleChoices.push({ name: element.title, value: element.id });
        });
        employees.forEach(element => {
            managerChoices.push({ name: `${element.first_name} ${element.last_name}`, value: element.id });
        });
        const answers = await inquirer
            .prompt([
                {
                    type: 'input',
                    message: "First name?",
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: "Last name?",
                    name: 'lastName'
                },
                {
                    type: 'list',
                    message: 'Choose role:',
                    name: 'role',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    message: 'Choose manager:',
                    name: 'manager',
                    choices: managerChoices
                }
            ]);
        let firstName = answers.firstName.trim();
        let lastName = answers.lastName.trim();
        let roleID = answers.role;
        let managerID = answers.manager;
        TrackerCRUD.addEmployee(firstName, lastName, roleID, managerID);
        this.mainMenu();
    }

    // Update employee role menu. employees is an array of {firstName, lastName, id} objects. roles is an array of {roleName, id} objects. Select an employee and a role from a list of each. Returns an array of [employeeID, roleID]

    static async updateEmployeeRoleMenu(employees, roles) {
        let roleChoices = [];
        let employeeChoices = [];
        roles.forEach(element => {
            roleChoices.push({ name: element.title, value: element.id });
        });
        employees.forEach(element => {
            employeeChoices.push({ name: `${element.first_name} ${element.last_name}`, value: element.id });
        });
        const answers = await inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Choose employee:',
                    name: 'employee',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    message: 'Choose role:',
                    name: 'role',
                    choices: roleChoices
                }
            ]);
        let roleID = answers.role;
        let employeeID = answers.employee;
        TrackerCRUD.updateEmployeeRole(employeeID, roleID);
        this.mainMenu();
    }
}
module.exports = TrackerCLI;