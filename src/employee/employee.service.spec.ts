import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './employee.dto';

describe('EmployeeService', () => {
    let service: EmployeeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EmployeeService],
        }).compile();

        service = module.get<EmployeeService>(EmployeeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create an employee', () => {
        const employeeDto: EmployeeDto = { id:1, name: 'John Doe', salary: 50000 };
        const employee = service.create(employeeDto);

        expect(employee).toEqual({ id: expect.any(Number), ...employeeDto });
    });

    it('should find all employees', () => {
        const employeeDto: EmployeeDto = { id:1, name: 'John Doe', salary: 50000 };
        service.create(employeeDto);

        expect(service.findAll()).toEqual([{ id: expect.any(Number), ...employeeDto }]);
    });

    it('should find one employee by name', () => {
        const employeeDto: EmployeeDto = { id:1, name: 'John Doe', salary: 50000 };
        service.create(employeeDto);

        expect(service.findOneByName('John Doe')).toEqual({ id: expect.any(Number), ...employeeDto });
    });

    it('should remove an employee', () => {
        const employeeDto: EmployeeDto = {id:1, name: 'John Doe', salary: 50000 };
        const employee = service.create(employeeDto);

        service.remove(employee.id);

        expect(service.findAll()).toEqual([]);
    });

    it('should get the employee with the highest salary', () => {
        const employeeDto1: EmployeeDto = { id:1, name: 'John Doe', salary: 50000};
        const employeeDto2: EmployeeDto = { id:2, name: 'Jane Doe', salary: 60000};
        service.create(employeeDto1);
        service.create(employeeDto2);

        expect(service.getHighestSalaryEmployee()).toEqual({ id: expect.any(Number), ...employeeDto2 });
    });
});
