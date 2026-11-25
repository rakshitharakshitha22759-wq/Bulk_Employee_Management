import Employee from "../models/Employee.js";

import processEmployees from "../services/employeeService.js";


// Add Employee
export const addEmployee = async (req, res) => {

    try {

        const { empCode, empName, salary } = req.body;

        if (
            typeof empCode !== "string" ||
            !empCode.trim() ||
            typeof empName !== "string" ||
            !empName.trim() ||
            salary === undefined ||
            salary === null ||
            salary === "" ||
            !Number.isFinite(Number(salary)) ||
            Number(salary) < 0
        ) {

            return res.status(400).json({
                message: "Please provide valid employee details"
            });

        }

        const employee = await Employee.create({
            empCode: empCode.trim(),
            empName: empName.trim(),
            salary: Number(salary)
        });

        res.status(201).json({
            message: "Employee added successfully",
            employee
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Employee code already exists"
            });
        }

        res.status(500).json({
            message: error.message
        });

    }

};


// Get All Employees
export const getEmployees = async (req, res) => {

    try {

        const employees = await Employee.find()
            .sort({ empCode: 1 });

        res.status(200).json({
            totalEmployees: employees.length,
            employees
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Bulk Employee Processing
export const bulkCreateEmployees = async (req, res) => {

    try {

        const employees = req.body;

        if (!Array.isArray(employees) || employees.length === 0) {

            return res.status(400).json({
                message: "Please provide an employee array"
            });

        }

        // Validate employee records
        for (const emp of employees) {

            if (
                !emp ||
                typeof emp.empCode !== "string" ||
                !emp.empCode.trim() ||
                typeof emp.empName !== "string" ||
                !emp.empName.trim() ||
                emp.salary === undefined ||
                emp.salary === null ||
                emp.salary === "" ||
                !Number.isFinite(Number(emp.salary)) ||
                Number(emp.salary) < 0
            ) {

                return res.status(400).json({
                    message: "Invalid employee data"
                });

            }

        }

        const validEmployees = employees.map(emp => ({
            empCode: emp.empCode.trim(),
            empName: emp.empName.trim(),
            salary: Number(emp.salary)
        }));

        // DSA processing
        const processedEmployees = processEmployees(validEmployees);

        // Save multiple employees
        const operations = processedEmployees.map(emp => ({

            updateOne: {

                filter: { empCode: emp.empCode },

                update: {
                    $set: {
                        empName: emp.empName,
                        salary: emp.salary
                    }
                },

                upsert: true

            }

        }));

        await Employee.bulkWrite(operations);

        const allEmployees = await Employee.find()
            .sort({ empCode: 1 });

        res.status(200).json({

            message: "Bulk processing completed successfully",

            totalReceived: employees.length,

            totalUnique: processedEmployees.length,

            duplicatesRemoved:
                employees.length - processedEmployees.length,

            employees: allEmployees

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Delete Employee
export const deleteEmployee = async (req, res) => {

    try {

        const employee = await Employee.findOneAndDelete({
            empCode: req.params.empCode
        });

        if (!employee) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};