import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './employee.dto';

describe('EmployeeController', () => {
    let controller: EmployeeController;
    let service: EmployeeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmployeeController],
            providers: [EmployeeService],
        }).compile();

        controller = module.get<EmployeeController>(EmployeeController);
        service = module.get<EmployeeService>(EmployeeService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create an employee', () => {
        const employeeDto: EmployeeDto = {id: 1, name: 'John Doe', salary: 50000 };
        jest.spyOn(service, 'create').mockImplementation(() => ({ id: 1, ...employeeDto }));

        expect(controller.create(employeeDto)).toEqual({ id: 1, ...employeeDto });
    });

    it('should find all employees', () => {
        const result: EmployeeDto[] = [{ id:1, name: 'John Doe', salary: 50000 }];
        jest.spyOn(service, 'findAll').mockImplementation(() => result);

        expect(controller.findAll()).toBe(result);
    });

    it('should find one employee by name', () => {
        const result: EmployeeDto = { id:1, name: 'John Doe', salary: 50000 };
        jest.spyOn(service, 'findOneByName').mockImplementation(() => result);

        expect(controller.findOneByName('John Doe')).toBe(result);
    });

    it('should remove an employee', () => {
        jest.spyOn(service, 'remove').mockImplementation(() => undefined);

        expect(controller.remove('1')).toBeUndefined();
    });

    it('should get the employee with the highest salary', () => {
        const result: EmployeeDto = { id: 1, name: 'John Doe', salary: 50000 };
        jest.spyOn(service, 'getHighestSalaryEmployee').mockImplementation(() => result);

        expect(controller.getHighestSalaryEmployee()).toBe(result);
    });
});
