import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly _productService: ProductService
    ) {

    }


    @Get('findAll')
    async getUsers(
        @Query('page', ParseIntPipe) page: number
    ): Promise<any> {
        const response = await this._productService.getAll(page);
        return {
            items: response.data,
            totalQuantity: response.count,
            totalPages: parseInt(response.totalPages)
        };
    }
}
