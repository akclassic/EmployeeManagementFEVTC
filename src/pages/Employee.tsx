import EmployeeTable from "../components/EmployeeTable";
import "./Employee.css";

function Employee() {
    return (
        <div className="employeecontainer">
            <h2>Employee List</h2>
            <EmployeeTable />
        </div>
    )
}

export default Employee;