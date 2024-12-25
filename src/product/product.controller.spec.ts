import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';

describe('ProductController', () => {
    let controller: ProductController;
    let service: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a product', () => {
        const productDto: ProductDto = { id: 1, name: 'Test Product', price: 100, description: 'Test Description' };
        jest.spyOn(service, 'create').mockImplementation(() => productDto);

        expect(controller.create(productDto)).toBe(productDto);
    });

    it('should find all products', () => {
        const result: ProductDto[] = [{ id: 1, name: 'Test Product', price: 100, description: 'Test Description' }];
        jest.spyOn(service, 'findAll').mockImplementation(() => result);

        expect(controller.findAll()).toBe(result);
    });

    it('should find one product', () => {
        const result: ProductDto = { id: 1, name: 'Test Product', price: 100, description: 'Test Description' };
        jest.spyOn(service, 'findOne').mockImplementation(() => result);

        expect(controller.findOne('1')).toBe(result);
    });

    it('should update a product', () => {
        const result: ProductDto = { id: 1, name: 'Updated Product', price: 100, description: 'Updated Description' };
        jest.spyOn(service, 'update').mockImplementation(() => result);

        expect(controller.update('1', result)).toBe(result);
    });

    it('should delete a product', () => {
        jest.spyOn(service, 'remove').mockImplementation(() => undefined);

        expect(controller.remove('1')).toBeUndefined();
    });
});
