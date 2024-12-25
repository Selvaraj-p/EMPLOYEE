import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './employee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post()
    create(@Body() employeeDto: EmployeeDto) {
        return this.employeeService.create(employeeDto);
    }

    @Get()
    findAll() {
        return this.employeeService.findAll();
    }

    @Get('name/:name')
    findOneByName(@Param('name') name: string) {
        return this.employeeService.findOneByName(name);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.employeeService.remove(parseInt(id));
    }

    @Get('highest-salary')
    getHighestSalaryEmployee() {
        return this.employeeService.getHighestSalaryEmployee();
    }
}
