import React, { useEffect, useState } from 'react';
import { EmployeeService } from '../services/concretes/EmployeeService';
import { EmployeeDetail } from '../types/Employee';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowToastMessage from './ToastMessage';


interface ToastProps {
    open: boolean;
    autoHideDuration: number;
    onClose: Function; 
    severity: string; 
    message: string;
}

const EmployeeTable: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeDetail[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [toastProps, setToastProps] = useState<ToastProps>();

    const employeeService = new EmployeeService();

    const handleClose = (event: any, reason: string) => {
        const props = { open: false, autoHideDuration: 5000, onClose: handleClose, severity: '', message: ''}
        setToastProps(props);
    };

    const fetchEmployees = async () => {
        try {
            const employeeData = await employeeService.fetchEmployees(currentPage, pageSize);
            setEmployees(employeeData.employees);
            setTotalPages(employeeData.totalPages);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [currentPage, pageSize]);

    const handlePageChange = (event: any, newPage: number) => {
        setCurrentPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    const handleDelete = async (employeeId: number) => {
        try {
            const result = await employeeService.deleteEmployee(employeeId);

            if (result) {
                const props = { open: true, autoHideDuration: 5000, onClose: handleClose, severity: 'success', message: 'Removed Employee Successfully'}
                setToastProps(props);
            } else {
                const props = { open: false, autoHideDuration: 5000, onClose: handleClose, severity: 'error', message: 'Error removing employee'}
                setToastProps(props);
            }

            await fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
            const props = { open: true, autoHideDuration: 5000, onClose: handleClose, severity: 'error', message: 'Error removing employee'}
            setToastProps(props);
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table style={{ minHeight: pageSize * 53, maxWidth: 1024 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell align="right">Employee Number</TableCell>
                            <TableCell align="right">Date Joined</TableCell>
                            <TableCell align="right">Extension</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow
                                key={employee.employeeId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {employee.employeeId}
                                </TableCell>
                                <TableCell align="right">{employee.employeeName}</TableCell>
                                <TableCell align="right">{employee.employeeNumber}</TableCell>
                                <TableCell align="right">{employee.dateJoined}</TableCell>
                                <TableCell align="right">{employee.extension ? employee.extension : "NA"}</TableCell>
                                <TableCell align="right">{employee.role ? employee.role : "No role"}</TableCell>
                                <TableCell align="right">
                                    <DeleteIcon
                                        onClick={() => handleDelete(employee.employeeId)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {employees.length < pageSize &&
                            [...Array(pageSize - employees.length)].map((e, i) => (
                                <TableRow key={i} style={{ height: 53 }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={totalPages}
                    rowsPerPage={pageSize}
                    page={currentPage - 1}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10 ]}
                />
            </TableContainer>
            {toastProps ? <ShowToastMessage 
                open={toastProps.open}
                autoHideDuration={toastProps.autoHideDuration}
                message={toastProps.message}
                onClose={toastProps.onClose}
                severity={toastProps.severity}
            />: null}
        </div>
    );
};

export default EmployeeTable;
