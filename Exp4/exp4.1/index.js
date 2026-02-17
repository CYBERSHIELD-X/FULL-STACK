const fs = require('fs');
const readline = require('readline');

const FILE = 'data.json';

// Load employees from file
let employees = [];

if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE);
    employees = JSON.parse(data);
}

// Save employees to file
function saveData() {
    fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Show Menu
function showMenu() {
    console.log("\n===== Employee Management System =====");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");

    rl.question("Choose option: ", handleMenu);
}

function handleMenu(choice) {
    switch (choice) {
        case '1':
            addEmployee();
            break;
        case '2':
            viewEmployees();
            break;
        case '3':
            updateEmployee();
            break;
        case '4':
            deleteEmployee();
            break;
        case '5':
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice!");
            showMenu();
    }
}

// Add Employee
function addEmployee() {
    rl.question("Enter ID: ", (id) => {
        rl.question("Enter Name: ", (name) => {
            rl.question("Enter Salary: ", (salary) => {

                if (!id || !name || isNaN(salary)) {
                    console.log("Invalid input!");
                    return showMenu();
                }

                employees.push({ id, name, salary: Number(salary) });
                saveData();
                console.log("Employee added successfully!");
                showMenu();
            });
        });
    });
}

// View Employees
function viewEmployees() {
    console.log("\nEmployee List:");
    console.table(employees);
    showMenu();
}

// Update Employee
function updateEmployee() {
    rl.question("Enter Employee ID to update: ", (id) => {
        const emp = employees.find(e => e.id === id);

        if (!emp) {
            console.log("Employee not found!");
            return showMenu();
        }

        rl.question("Enter new Name: ", (name) => {
            rl.question("Enter new Salary: ", (salary) => {

                if (!name || isNaN(salary)) {
                    console.log("Invalid input!");
                    return showMenu();
                }

                emp.name = name;
                emp.salary = Number(salary);
                saveData();
                console.log("Employee updated successfully!");
                showMenu();
            });
        });
    });
}

// Delete Employee
function deleteEmployee() {
    rl.question("Enter Employee ID to delete: ", (id) => {
        employees = employees.filter(e => e.id !== id);
        saveData();
        console.log("Employee deleted successfully!");
        showMenu();
    });
}

// Start Program
showMenu();

