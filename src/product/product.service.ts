import { Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
    private readonly products: ProductDto[] = [];

    create(productDto: ProductDto): ProductDto {
        const product = { ...productDto, id: Date.now() };
        this.products.push(product);
        return product;
    }

    findAll(): ProductDto[] {
        return this.products;
    }

    findOne(id: number): ProductDto | undefined {
        return this.products.find(product => product.id === id);
    }

    update(id: number, productDto: ProductDto): ProductDto | undefined {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...productDto };
            return this.products[index];
        }
        return undefined;
    }

    remove(id: number): void {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }
}
