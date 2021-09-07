const consoleTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeetracker",
});


const questions = [
    {
      type: "list",
      message: "What would you like to do?",
      name: "entryQuestion",
      choices: [
        {
          name: "View All Employees",
          value: "employeesView",
        },
      {
        name: "View All Employees By Department",
        value: "employeeDepartmentView",
      },
      {
        name: "View All Employees By Manager",
        value: "employeeManagerView",
      },
        {
          name: "Add Employee",
          value: "employeeAdd",
        },
      {
        name: "Remove Employee",
        value: "employeeRemove",
      },
        {
          name: "Update Employee Role",
          value: "employeeUpdate",
        },
        {
          name: "View All Roles",
          value: "roleView",
        },
        {
          name: "Add Role",
          value: "roleAdd",
        },
      {
        name: "Remove Role",
        value: "roleRemove",
      },
        {
          name: "View All Departments",
          value: "departmentView",
        },
        {
          name: "Add Department",
          value: "departmentAdd",
        },
      {
        name: "Remove Department",
        value: "departmentRemove",
      },
        {
          name: "Quit",
          value: "quit",
        },
      ],
    },
  ];


  

const viewEmployees = () => {
    console.log(`Loading all information... \n`);
  connection.query(
    `SELECT e.id as ID
        , CONCAT(e.first_name, ' ', e.last_name) AS Employee
        , r.title AS Title
        , d.name AS Department
        , r.salary AS Salary
        , CONCAT(m.first_name,' ', m.last_name) AS Manager 
        FROM employee e 
            LEFT JOIN employee m ON m.id = e.manager_id 
            JOIN role r ON e.role_id = r.id 
            JOIN department d ON d.id = r.department_id 
            ORDER BY e.last_name ASC`, 
    (err, res) => {
      if(err) {
        console.error(`Error : `, err); 
      }
      console.table(res); 
      init(); 
    }
  )
};

const viewEmployeesDepartment = () => {
    console.log(`Loading all information... \n`);
  connection.query(
    `SELECT e.id as ID
        , CONCAT(e.first_name, ' ', e.last_name) AS Employee
        , r.title AS Title
        , d.name AS Department
        , r.salary AS Salary
        , CONCAT(m.first_name,' ', m.last_name) AS Manager 
        FROM employee e 
            LEFT JOIN employee m ON m.id = e.manager_id 
            JOIN role r ON e.role_id = r.id 
            JOIN department d ON d.id = r.department_id 
            ORDER BY d.name ASC`, 
    (err, res) => {
      if(err) {
        console.error(`Error : `, err); 
      }
      console.table(res); 
      init(); 
    }
  )
};
const viewEmployeesManager = () => {
    console.log(`Loading all information... \n`);
  connection.query(
    `SELECT e.id as ID
        , CONCAT(e.first_name, ' ', e.last_name) AS Employee
        , r.title AS Title
        , d.name AS Department
        , r.salary AS Salary
        , CONCAT(m.first_name,' ', m.last_name) AS Manager 
        FROM employee e 
            LEFT JOIN employee m ON m.id = e.manager_id 
            JOIN role r ON e.role_id = r.id 
            JOIN department d ON d.id = r.department_id 
            ORDER BY m.last_name ASC`, 
    (err, res) => {
      if(err) {
        console.error(`Error : `, err); 
      }
      console.table(res); 
      init(); 
    }
  )
};
  
const viewRoles = () => {
    console.log(`Loading all information... \n`);
  connection.query(
    `SELECT r.id as ID
        , r.title AS Role
        FROM role r 
            ORDER BY r.title ASC`, 
    (err, res) => {
      if(err) {
        console.error(`Error : `, err); 
      }
      console.table(res); 
      init(); 
    }
  )
};

const viewDepartments = () => {
    console.log(`Loading all information... \n`);
  connection.query(
    `SELECT d.id as ID
        , d.name AS Department
        FROM department d 
            ORDER BY d.name ASC`, 
    (err, res) => {
      if(err) {
        console.error(`Error : `, err); 
      }
      console.table(res); 
      init(); 
    }
  )
};
const addEmployee = () => {
    connection.query("SELECT * FROM role", (err, results) => {
      if (err) throw err;
      const allRoles = results.map(function (role) {
        return {
          value: role.id,
          name: role.title,
        };
      });
      connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        const allManagers = results.map(function (manager) {
          return {
            value: manager.id,
            name: manager.first_name + ' ' + manager.last_name,
          };
        });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
          },
          {
            type: "list",
            message: "What is the employee's job role?",
            name: "role",
            choices: allRoles,
          },
          {
            type: "list",
            message: "What is the employee's manager?",
            name: "manager",
            choices: allManagers,
          },
        ])
        .then((answer) => {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: answer.role,
              manager_id: answer.manager,
            },
            (err) => {
              if (err) throw err;
              console.log("new employee added!");
              init();
            }
          );
        });
    });
  });
};

const addDepartment = () => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What department would you like to add?",
          name: "newDepartment",
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.newDepartment,
          },
          (err) => {
            if (err) throw err;
            console.log("New department added");
            init();
          }
        );
      });
  };

  const addRole = () => {
    connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        const allDepartments = results.map(function (department) {
          return {
            value: department.id,
            name: department.name,
          };
        });
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the title of the new role?",
              name: "title",
            },
            {
              type: "input",
              message: "What is the salary of the new role?",
              name: "salary",
            },
          
            {
              type: "list",
              message: "What is the department for this role?",
              name: "department",
              choices: allDepartments,
            },
          ])
          .then((answer) => {
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department,
              },
              (err) => {
                if (err) throw err;
                console.log("new role added!");
                init();
              }
            );
          });
      });
  };

const removeEmployee = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        const allEmployees = results.map(function (employee) {
          return {
            value: employee.id,
            name: employee.first_name + ' ' + employee.last_name,
          };
        });
        inquirer
          .prompt([

            {
              type: "list",
              message: "Which employee would you like to remove?",
              name: "employee",
              choices: allEmployees,
            },
          ])
          .then((answer) => {
            const removeEmployee = "DELETE FROM employee WHERE ?";
            connection.query(removeEmployee,
                [
                    {
                        id: answer.employee,
                    },
                ],
                (err) => {
                    if (err) throw err;
                    console.log('Employee removed');
                    init();
                })
        })
    })
}


const removeRole = () => {
    connection.query("SELECT * FROM role", (err, results) => {
        if (err) throw err;
        const allRoles = results.map(function (role) {
          return {
            value: role.id,
            name: role.title,
          };
        });
        inquirer
          .prompt([
            {
              type: "list",
              message: "Which role would you like to remove?",
              name: "role",
              choices: allRoles,
            },
          ])
          .then((answer) => {
            const removeRole = "DELETE FROM role WHERE ?";
            connection.query(removeRole,
                [
                    {
                        id: answer.role,
                    },
                ],
                (err) => {
                    if (err) throw err;
                    console.log('Role removed');
                    init();
                })
        })
    })
}

const removeDepartment = () => {
    connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        const allDepartments = results.map(function (department) {
          return {
            value: department.id,
            name: department.name,
          };
        });
        inquirer
          .prompt([
            {
              type: "list",
              message: "Which department would you like to remove?",
              name: "department",
              choices: allDepartments,
            },
          ])
          .then((answer) => {
            const removeDepartment = "DELETE FROM department WHERE ?";
            connection.query(removeDepartment,
                [
                    {
                        id: answer.department,
                    },
                ],
                (err) => {
                    if (err) throw err;
                    console.log('department removed');
                    init();
                })
        })
    })
}


const updateEmployeeRole = () => {
    connection.query("SELECT * FROM role", (err, results) => {
      if (err) throw err;
      const allRoles = results.map(function (role) {
        return {
          value: role.id,
          name: role.title,
        };
      });
      connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        const allEmployees = results.map(function (employee) {
          return {
            value: employee.id,
            name: employee.first_name + ' ' + employee.last_name,
          };
        });
      inquirer
        .prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "employee",
            choices: allEmployees,
            },
            {
            type: "list",
            message: "What role would you like to give this employee?",
            name: "role",
            choices: allRoles,
          },
 
        ])
        .then((answer) => {
          connection.query(
            "UPDATE employee set ? WHERE ?",
            [
                {
                  role_id: answer.role,
                },
                {
                  id: answer.employee,
                }
              ],
            (err) => {
              if (err) throw err;
              console.log("employee updated");
              init();
            }
          );
        });
    });
  });
};


init = () => {
    inquirer.prompt(questions).then((answer) => {
        switch (answer.entryQuestion) {
            case "employeesView":
                viewEmployees();
            break;
            case "employeeDepartmentView":
                viewEmployeesDepartment();
            break;
            case "employeeManagerView":
                viewEmployeesManager();
            break;
            case "roleView":
                viewRoles();
            break;
            case "departmentView":
                viewDepartments();
            break;
            case "employeeAdd":
                addEmployee();
            break;
            case "roleAdd":
                addRole();
            break;
            case "departmentAdd":
                addDepartment();
            break;
            case "employeeRemove":
                removeEmployee();
            break;
            case "roleRemove":
                removeRole();
            break;
            case "departmentRemove":
                removeDepartment();
            break;
            case "employeeUpdate":
                updateEmployeeRole();
            break;
            case "quit":
                connection.end();
            break;
    }
})};



connection.connect((err) => {
    if (err) throw err;
    init();
  });