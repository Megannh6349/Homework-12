const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'rootpass',
    database: 'cms_db'
});

// connection.connect(function (err) {
//     if (err) throw err;
// });

// CLI Logic
function start() {
    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "Welcome to the Employee Tracker! Please select an option below to proceed.",
        choices: [
            "Add an employee",
            "Remove an employee",
            "Update an employee's role",
            "Add a department",
            "Add a role",
            "View all employees",
            "View all departments",
            "View all roles",
            "Report this shady business",
            "Exit"
        ]
    }).then(function (answer) {
        console.log("answer: ", answer);
        // Regret making all of these choices
        switch (answer.menu) {
            // Because each of these choices needs its own function why have I done this
            case "Add an employee":
                addEmp();
                break;

            case "Remove an employee":
                removeEmp();
                break;

            case "Update an employee's role":
                updateEmpRole();
                break;

            case "Add a department":
                addDept();
                break;

            case "Add a role":
                addRole();
                break;

            case "View all employees":
                viewEmp();
                break;

            case "View all departments":
                viewDepts();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "Report this shady business":
                nahLol();
                break;

            case 'Exit':
                connection.end();
                break;
        }
    });
};

// And here comes all of the functions

function addEmp() {
    console.log("addEmp function")
    // Create an array of roles to choose from using a for loop
    let rolesArray = [];
    let rolesQuery = "SELECT * FROM roles";

    connection.query(rolesQuery, function (err, res) {
        if(err) {
            console.log("addEmployee err: ", err);
        }
        console.log("addEmp res:::: ", res);
        for (let i = 0; i < res.length; i++) {
            rolesArray.push(res[i].title);
        };
        // Now we need to go back to these stupid questions
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter the employee's first name."
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter the employee's last name."
            },
            {
                name: "role",
                type: "list",
                choices: rolesArray,
                message: "And what will their role be?"
            }
        ]).then(function (answer) {
            // And then insert that information back into the db
            let EmpQuery = "INSERT INTO employees SET ?";
            connection.query(
                EmpQuery,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: null,
                    manager_id: null
                },
                function (err, answer) {
                    if (err) throw err;
                    console.table(answer);
                }
            );
        });
    });
    // Return to the menu
    start();
};

function removeEmp() {
    // Create an array of employees to choose from using a for loop, just like the last one
    // At this point, these notes are purely in case I forget how MySQL works because I just spent like 14 consecutive hours learning it
    // I did not sleep
    let empArray = [];
    let empQuery = "SELECT employees.first_name, employees.last_name FROM employees";

    connection.query(empQuery, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            empArray.push(res[i].first_name + " " + res[i].last_name);
        }

        // Give the user the option to remove one of these slackers
        inquirer.prompt([
            {
                name: "removeEmployee",
                type: "list",
                choices: empArray,
                message: "Pick an employee to... dispose of"
            },
        ]).then(function (res) {
            let empQuery = "DELETE FROM employees WHERE CONCAT(first_name, ' ', last_name) = '${res.removeEmployee}'";
            connection.query(empQuery, function (err, res) {
                if (err) throw err;
                console.log("Employee has been removed from the system.");
            });
        });
    });
    // Return to the menu
    start();

};

function updateEmpRole() {
    // Same deal, we need TWO arrays this time though
    // This is the most excitement I've seen in hours
    let empArray = [];
    let rolesArray = [];
    let rolesQuery = "SELECT first_name, last_name from employees, SELECT title FROM roles";
    // Reuse empArray from "Remove Employee"
    connection.query(empQuery, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            empArray.push(res[i].first_name + " " + res[i].last_name);
        };
        // Reuse rolesArray from "Add employee"
        connection.query(rolesQuery, function (err, res) {
            for (let i = 0; i < res.length; i++) {
                rolesArray.push(res[i].title);
            };

            inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    choices: empArray,
                    message: "Whose role would you like to change?"
                },
                {
                    name: "role",
                    type: "list",
                    choices: rolesArray,
                    message: "And what should their new role be?"
                }
            ]).then(function (answer) {
                let empRoleQuery = "UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = ?) WHERE id = (SELECT id FROM(SELECT id FROM employees WHERE CONCAT(first_name, ' ',last_name) = ?))";
                connection.query(empRoleQuery, [answer.rolesArray, answer.employee], function (err, res) {
                    if (err) throw err;
                });
            });
        });
    });
    // Return to the menu
    start();
}

function addDept() {
    // I don't think I need an array here
    inquirer.prompt([
        {
            name: "dept",
            type: "list",
            message: "What is the name of the new department?"
        }
    ]).then(function (answer) {
        let deptQuery = "INSERT INTO departments SET ?";
        connection.query(deptQuery, { name: answer.addDept }),
            function (err) {
                if (err) throw err;
            }
    });
    // Return to the menu
    start();
};

function addRole() {
    // I never want to look at another array ever again
    let roleQuery = "SELECT * FROM departments";
    let depts = [];

    connection.query(roleQuery, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            depts.push(res[i].title);
        };
        // Reusing logic from add employee
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role you'd like to create?"
            },
            {
                name: "salary",
                type: "input",
                message: "And how much should we pay them? Please enter this as a number with no commas or decimals (ex. 100000 or 53000)."
            },
            {
                name: "depts",
                type: "list",
                choices: depts,
                message: "What department should this role work in?"
            }
        ]).then(function (answer) {
            let roleQuery = "INSERT INTO roles SET ?";
            connection.query(roleQuery, { title: answer.newTitle, salary: answer.newSalary, department_id: answer.deptList }, function (err, res) {
                if (err) throw err;
                console.table(res)
            }
            );
        });
    });
    // Return to the menu
    start();
};

function viewEmp() {
    // Just going to select everything and display it here
    let viewEmpQuery = "SELECT * FROM employees"

    connection.query(viewEmpQuery, function (err, res) {
        if (err) throw err;
        console.table("Current employees: ", res);
        // Return to menu
        start();
    });
};

function viewDepts() {
    var deptQuery = "SELECT * FROM departments";

    connection.query(deptQuery, function (err, res) {
        if (err) throw err;
        console.table("Current departments: ", res);
    });
    // Return to menu
    start();
};

function viewRoles() {
    var roleQuery = "SELECT * FROM roles";

    connection.query(roleQuery, function (err, res) {
        if (err) throw err;
        console.table("Current roles: ", res);
    });
    // Return to menu
    start();
};

function nahLol() {
    inquirer.prompt([
        {
            name: "report",
            type: "list",
            message: "Would you like to report this super shady sounding business?",
            choices: ["Nah", "No", "Absolutely not"]
        },
        {
            name: "lol",
            type: "list",
            message: "Good. Didn't think so.",
            choices: ["Okay..."]
        }
    ]);
    // Return to menu
    start();
};

start();
