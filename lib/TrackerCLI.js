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

    // Add role menu method. depts is an array of department names. Asks for role name, role salary, and provides a list of departments to choose from. Returns an array containing [Role name, salary, department]

    static addRoleMenu(depts) {
        let deptChoices = [];
        depts.forEach(element => {
            deptChoices.push({name: element});
        });
        inquirer
        .prompt([
            {
                type: 'input',
                message: "Role name?",
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
            let department = answers.dept;
            return [roleName, salary, department];
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
    }

    // Add employee menu. roles is an array of roles. employees is an array of employees. Asks for first name and last name. Role and manager are chosen from lists. Returns an array containing [firstName, lastName, role, manager]

    static addEmployeeMenu(roles, employees) {
        let roleChoices = [];
        let managerChoices = ["None"];
        roles.forEach(element => {
            roleChoices.push({name: element});
        });
        employees.forEach(element => {
            managerChoices.push({name: element});
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
            let role = answers.role;
            let manager = answers.manager;
            return [firstName, lastName, role, manager];
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