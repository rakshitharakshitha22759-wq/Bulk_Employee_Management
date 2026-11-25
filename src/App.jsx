import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/employees";

function App() {

    const [employees, setEmployees] = useState([]);

    const [empCode, setEmpCode] = useState("");
    const [empName, setEmpName] = useState("");
    const [salary, setSalary] = useState("");

    const [search, setSearch] = useState("");

    // Sorting state (default: by employee code, ascending)
    const [sortField, setSortField] = useState("empCode");
    const [sortOrder, setSortOrder] = useState("asc");

    // GET employees from backend
    const fetchEmployees = async () => {

        try {

            const response = await axios.get(API);

            setEmployees(response.data.employees);

        } catch (error) {

            console.log(error);

            alert("Unable to fetch employees");

        }

    };

    // Load employees when page opens
    useEffect(() => {

        fetchEmployees();

    }, []);

    // POST - Add employee
    const addEmployee = async (e) => {

        e.preventDefault();

        if (!empCode.trim() || !empName.trim() || salary === "") {

            alert("Please fill all fields");
            return;

        }

        try {

            const response = await axios.post(API, {

                empCode: empCode.trim(),
                empName: empName.trim(),
                salary: Number(salary)

            });

            alert(response.data.message);

            setEmpCode("");
            setEmpName("");
            setSalary("");

            fetchEmployees();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Employee adding failed"
            );

        }

    };

    // DELETE employee
    const deleteEmployee = async (code) => {

        try {

            const response = await axios.delete(
                `${API}/${encodeURIComponent(code)}`
            );

            alert(response.data.message);

            fetchEmployees();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete failed"
            );

        }

    };

    // Handle header click for sorting
    const handleSort = (field) => {

        if (sortField === field) {

            setSortOrder(sortOrder === "asc" ? "desc" : "asc");

        } else {

            setSortField(field);
            setSortOrder("asc");

        }

    };

    // Search employees
    const filteredEmployees = employees.filter(emp =>

        emp.empName.toLowerCase().includes(search.toLowerCase()) ||

        emp.empCode.toLowerCase().includes(search.toLowerCase())

    );

    // Sort employees
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {

        const result = a[sortField].localeCompare(b[sortField], undefined, {
            numeric: true,
            sensitivity: "base"
        });

        return sortOrder === "asc" ? result : -result;

    });

    return (

        <div className="container">

            <h1>Bulk Employee Management</h1>

            <h2>Add Employee</h2>

            <form onSubmit={addEmployee}>

                <input
                    type="text"
                    placeholder="Employee Code"
                    value={empCode}
                    onChange={(e) => setEmpCode(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Employee Name"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />

                <button type="submit">
                    Add Employee
                </button>

            </form>

            <hr />

            <h2>Employee Records</h2>

            <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <h3>Total Employees: {employees.length}</h3>

            <table>

                <thead>

                    <tr>
                        <th
                            onClick={() => handleSort("empCode")}
                            style={{ cursor: "pointer" }}
                        >
                            Employee Code {sortField === "empCode" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                            onClick={() => handleSort("empName")}
                            style={{ cursor: "pointer" }}
                        >
                            Employee Name {sortField === "empName" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {sortedEmployees.map(emp => (

                        <tr key={emp.empCode}>

                            <td>{emp.empCode}</td>

                            <td>{emp.empName}</td>

                            <td>₹{emp.salary}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        deleteEmployee(emp.empCode)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default App;