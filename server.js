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
      name: "layer1",
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

// }
  
init = () => {
    inquirer.prompt(questions).then((answer) => {
        switch (answer.entryQuestion) {
            case "employeesView":
                viewEmployees();
              break;
    }
})};

connection.connect((err) => {
    if (err) throw err;
    init();
  });