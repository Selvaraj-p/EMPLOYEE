import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeDto } from './employee.dto';

@Injectable()
export class EmployeeService {
    private readonly employees: Employee[] = [];

    create(employeeDto: EmployeeDto): Employee {
        const employee = { ...employeeDto, id: Date.now() };
        this.employees.push(employee);
        return employee;
    }

    findAll(): Employee[] {
        return this.employees;
    }

    findOneByName(name: string): Employee | undefined {
        return this.employees.find(employee => employee.name === name);
    }

    remove(id: number): void {
        const index = this.employees.findIndex(employee => employee.id === id);
        if (index !== -1) {
            this.employees.splice(index, 1);
        }
    }

    getHighestSalaryEmployee(): Employee | undefined {
        return this.employees.reduce((prev, current) => (prev.salary > current.salary ? prev : current));
    }
}
