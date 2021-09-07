
const inquirer = require("inquirer");


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

module.exports = {
    viewEmployees,
    viewEmployeesDepartment,
    viewEmployeesManager,
    viewRoles,
    viewDepartments
};