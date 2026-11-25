// Remove duplicate employees using Map
const removeDuplicates = (employees) => {

    const employeeMap = new Map();

    employees.forEach((emp) => {

        employeeMap.set(emp.empCode, emp);

    });

    return Array.from(employeeMap.values());

};


// Sort employees
const sortEmployees = (employees) => {

    return employees.sort((a, b) => {

        return a.empCode.localeCompare(b.empCode);

    });

};


// Main processing function
const processEmployees = (employees) => {

    const uniqueEmployees = removeDuplicates(employees);

    const sortedEmployees = sortEmployees(uniqueEmployees);

    return sortedEmployees;

};

export default processEmployees;