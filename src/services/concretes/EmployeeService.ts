// src/services/EmployeeService.ts
import axios from 'axios';
import { Employee } from '../../types/Employee';
import { IEmployeeService } from '../contracts/IEmployeeService';

const API_URL = 'https://localhost:5001/api/employee';

export class EmployeeService implements IEmployeeService {

    public async deleteEmployee(employeeId: number): Promise<boolean> {
        const response = await axios.delete(`${API_URL}/${employeeId}`);
        if (response.status === 204) {
            return true;
        }
        else {
            return false;
        }
    }

    public async fetchEmployees(pageNumber: number = 1, pageSize: number = 10): Promise<Employee> {
        try {
            const response = await axios.get(`${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            // console.log(response.data);
            return response.data; 
        } catch (error) {
            throw new Error('Failed to fetch employees');
        }
    }
}
