export interface Employee {
    employees: EmployeeDetail[];
    totalPages: number;
}

export interface EmployeeDetail {
    employeeId: number;
    employeeName: string;
    employeeNumber: number;
    dateJoined: string;
    extension?: number;
    role: string;
}