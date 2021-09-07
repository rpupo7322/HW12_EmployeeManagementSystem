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
    }
})};



connection.connect((err) => {
    if (err) throw err;
    init();
  });