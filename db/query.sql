

select employee.id as ID,employee.first_name as FirstName, employee.last_name as LastName,role.title as Role , role.salary as Salary,department.name AS Department, employee.manager_id
FROM employee 
JOIN role ON employee.role_id=role.id 
JOIN department on department.id=role.department_id;


select employee.id as ID,employee.first_name as FirstName, employee.last_name as LastName,role.title as Role , role.salary as Salary,department.name AS Department, employee.manager_id
WHERE department.id = 1
FROM employee 
JOIN role ON employee.role_id=role.id 
JOIN department on department.id=role.department_id;
