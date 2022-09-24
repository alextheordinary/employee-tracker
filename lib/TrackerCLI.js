const inquirer = require('inquirer');

class TrackerCLI {

    /* Main menu method. Has the following options:
        View all departments
        View all roles
        View all employees
        Add a department
        Add a role
        Add an employee
        Update an employee role
       
       Returns a string value representing the chosen action
    */
    static mainMenu() {
        inquirer
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
                    ]
                }
            ])
            .then((answers) => {
                return answers.action;
            })
            .catch((error) => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else went wrong
                }
            });
    }

    // Add department menu method. Ask for a department name and then returns that department name  

    static addDeptMenu() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "Department name?",
                    name: 'dept'
                },
            ])
            .then((answers) => {
                let deptName = answers.dept.trim();
                return deptName;
            })
            .catch((error) => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else went wrong
                }
            });
    }

    // Add role menu method. depts is an array of {deptName, id} objects. Asks for role name, role salary, and provides a list of departments to choose from. Returns an array containing [Role name, salary, deptID]

    static addRoleMenu(depts) {
        let deptChoices = [];
        depts.forEach(element => {
            deptChoices.push({name: element.deptName, value: element.id});
        });
        inquirer
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
        ])
        .then((answers) => {
            let roleName = answers.role.trim();
            let salary = answers.salary;
            let deptID = answers.dept;
            return [roleName, salary, deptID];
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
    }

    // Add employee menu. roles is an array of {roleName, id} objects. employees is an array of {firstname, lastName, id} objects. Asks for first name and last name. Role and manager are chosen from lists. Returns an array containing [firstName, lastName, roleID, managerID]

    static addEmployeeMenu(roles, employees) {
        let roleChoices = [];
        let managerChoices = [{name: "None", value: null}];
        roles.forEach(element => {
            roleChoices.push({name: element.roleName, value: element.id});
        });
        employees.forEach(element => {
            managerChoices.push({name: `${element.firstName} ${element.lastName}`, value: element.id});
        });
        inquirer
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
        ])
        .then((answers) => {
            let firstName = answers.firstName.trim();
            let lastName = answers.lastName.trim();
            let roleID = answers.role;
            let managerID = answers.manager;
            return [firstName, lastName, roleID, managerID];
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });

    }

    // Update employee role menu. employees is an array of {firstName, lastName, id} objects. roles is an array of {roleName, id} objects. Select an employee and a role from a list of each. Returns an array of [employeeID, roleID]

    static updateEmployeeRoleMenu(employees, roles) {
        let roleChoices = [];
        let employeeChoices = [];
        roles.forEach(element => {
            roleChoices.push({name: element.roleName, value: element.id});
        });
        employees.forEach(element => {
            employeeChoices.push({name: `${element.firstName} ${element.lastName}`, value: element.id});
        });
        inquirer
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
        ])
        .then((answers) => {
            let roleID = answers.role;
            let employeeID = answers.employee;
            return [employeeID, roleID];
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
    }
}
module.exports = TrackerCLI;