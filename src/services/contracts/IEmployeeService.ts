import { Employee } from "../../types/Employee";

export interface IEmployeeService {
    fetchEmployees(pageNumber: number, pageSize: number): Promise<Employee>;
    deleteEmployee(employeeId: number): Promise<boolean>;
}