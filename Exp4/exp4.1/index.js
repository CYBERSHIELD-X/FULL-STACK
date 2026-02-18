const fs = require('fs');
const readline = require('readline');

const FILE = 'data.json';

let employees = [];

if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE);
    employees = JSON.parse(data);
}

function saveData() {
    fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Show Menu
function showMenu() {
    console.log("\n===== Employee Management System =====");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Exit");

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
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice!");
            showMenu();
    }
}

// Add Employee (No Salary)
function addEmployee() {
    rl.question("Enter ID: ", (id) => {
        rl.question("Enter Name: ", (name) => {

            if (!id || !name) {
                console.log("Invalid input!");
                return showMenu();
            }

            employees.push({ id, name });
            saveData();
            console.log("Employee added successfully!");
            showMenu();
        });
    });
}

// View Employees
function viewEmployees() {
    console.log("\nEmployee List:");
    console.table(employees);
    showMenu();
}

// Start Program
showMenu();
