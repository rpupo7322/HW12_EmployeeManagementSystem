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
              console.log("employee added successfully!");
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
            case "QUIT":
                process.exit();
            break;
    }
})};



connection.connect((err) => {
    if (err) throw err;
    init();
  });