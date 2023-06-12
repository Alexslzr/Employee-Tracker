INSERT INTO department(name)
VALUES ("Human Resources"),
        ("Engineering"),
        ("Sales"),
        ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES  ("SalesPerson",5000,3),
        ("Sales Lead",7500,3),
        ("HR",3000,1),
        ("HR Lead",5000,1),
        ("Software Engineer", 7500,2),
        ("Tech Lead", 10000,2),
        ("Finance Person", 6000,4),
        ("Finance Lead", 8000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES  ("Alejandro", "Salazar", 6 ,NULL),
        ("Mike", "Felix", 5 , 1 ),
        ("Clarissa", "Jacobs", 4 ,NULL),
        ("Louis", "Brown", 3 , 3 ),
        ("Graciela", "Caro", 8 , NULL),
        ("Carlos", "Quintero", 7 , 5),
        ("Joel", "Guzman", 2 , NULL),
        ("Fernanda", "Lopez", 1 , 7 ),
        ("Peter", "Verdugo", 5 , 1 ),
        ("Mariana", "Ortega", 5 , 1 );
        
        
        
        