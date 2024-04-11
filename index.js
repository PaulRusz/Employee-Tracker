// Required modules
const { Pool } = require('pg')
const inquirer = require('inquirer')

const Table = require('cli-table3')


// 
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: "Ptr199101!",
    database: 'employee_tracker_db',
    port: 5432,
})

pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
        console.error('Error executing query', error)
    } else {
        console.log('Query results:', results.rows)
    }
})


// Initialize an empty stack to store menu history
const menuHistory = [];

// Function to display the main menu
function displayMainMenu() {
    inquirer.prompt([
        // 
        {
            name: "menuOptions",
            type: "list",
            message: "What would you like to do?:",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", 'Back']

        },
    ])
        .then((answers) => {
            handleUserChoices(answers)
        })
}


//Start of the application logic here
function handleUserChoices(answers) {
    // Handles the user's selection
    if (answers.menuOptions === 'Back') {
        const previousMenu = menuHistory.pop()
        if (previousMenu) {
            previousMenu()
        }
        else {
            menuHistory.push(displayMainMenu);

            switch (answers.menuOptions) {
                case 'View All Departments':
                    displayDepartments();
                    break;
                case 'View All Roles':
                    displayRoles();
                    break;
                case 'View All Employees':
                    displayEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateRole();
                    break;
            }
        }
    }



    // Departments
    function displayDepartments() {
        // Displays all departments
        const departments = [
            { id: 1, name: "Finance" },
            { id: 2, name: "Sales" },
            { id: 3, name: "Software" },
        ];

        // Creates a new table to view Departments
        const departmentTable = new Table({
            head: ['ID', 'Department Name'],
            colWidths: [10, 20]
        })

        // Populate the table with department data
        departments.forEach(department => {
            departmentTable.push([department.id, department.name])
        })

        // Display Table
        console.log(departmentTable.toString())
    }


    // Roles
    function displayRoles() {
        // Displays all roles
        const roles = [
            { id: 1, role: "Lawyer", department: "Software", salary: "$10,000" },
            { id: 2, role: "Office Manager", department: "Finance", salary: "$10,000" }
        ]

        // Creates a table to view the roles
        const roleTable = new Table({
            head: ['ID', 'Role', 'Department', 'Salary'],
            colWidths: [10, 20]
        })
        roles.forEach(role => {
            roleTable.push([role.id, role.role])
        })

        console.log(roleTable.toString())
    }



    // Employees
    function displayEmployees() {
        // Displays all employees
        const employees = [
            { id: 1, firstName: "Paul", lastName: "Berkley", jobTitle: "Lawyer", department: "Software", reportingManager: "Sue Chrysler" },
            { id: 2, firstName: "Travis", lastName: "Stewart", jobTitle: "Office Manager", department: "Finance", reportingManager: "Christian Taylor" }
        ]

        // Creates table to view employees
        const employeeTable = new Table({
            head: ['ID', 'First Name', 'Last Name', 'Job Title', 'Department', 'Employee Manager'],
            colWidths: [10, 20],
        })
        employees.forEach(employee => {
            employeeTable.push([employee.id, employee.firstName, employee.lastName, employee.jobTitle, employee.department, employee.reportingManager])
        })

        console.log(employeeTable.toString())
    }



    // Adds a department to the database
    function addDepartment() {

        inquirer.prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: 'Enter the name of the new department'
            }
        ]).then((answers) => {
            const newDepartment = {
                id: departments.length + 1,
                name: answers.departmentName
            }

            departments.push(newDepartment)
            console.log(`The department ${newDepartment.name} has been added.`)
        })
    }



    // Adds a role to the database
    function addRole() {

        inquirer.prompt([
            {
                name: 'roleName',
                type: 'input',
                message: "Enter the new role's name:",
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: "Enter the role's salary:"
            },
            {
                name: 'roleDepartment',
                type: 'input',
                message: "Enter the department the role will be a part of:"
            }


        ]).then((answers) => {
            const newRole = {
                id: roles.length + 1,
                name: answers.roleName,
                salary: answers.roleSalary,
                department: answers.roleDepartment
            }

            roles.push(newRole)
            console.log(`The role ${newRole.name} with a salary of ${newRole.salary} has been added to the ${newRole.department}.`)
        })
    }



    // Adds an employee to the database
    function addEmployee() {

        inquirer.prompt([
            {
                name: 'addEmployeeFirstName',
                type: 'input',
                message: "Enter the new employee's First Name:",
            },
            {
                name: 'addEmployeeLastName',
                type: 'input',
                message: "Enter the employee's last name:"
            },
            {
                name: 'addEmployeeRole',
                type: 'input',
                message: "Enter the employee's role:"
            },
            {
                name: 'addEmployeeManager',
                type: 'input',
                message: "Enter the employee's manager:"
            }

        ]).then((answers) => {
            const newEmployee = {
                id: employees.length + 1,
                firstName: answers.employeeFirstName,
                lastName: answers.employeeLastName,
                role: answers.employeeRole,
                manager: answers.employeeManager
            }

            roles.push(newEmployee)
            console.log('New employee added!')
        })
    }



    // Updates an employee role & updates role in the database
    function updateRole(employeeId, newRoleId) {
        const updateEmployeeQuery = 'UPDATE employee SET role_id = $1 WHERE id = $2';
        const updateEmployeeValues = [newRoleId, employeeId];

        client.query(updateEmployeeQuery, updateEmployeeValues, (err, res) => {
            if (err) {
                console.error('Error updating employee role', err)
            } else {
                console.log('Employee role updated!')
            }
        })
    }



    // Calls the Main Menu
    displayMainMenu();
}