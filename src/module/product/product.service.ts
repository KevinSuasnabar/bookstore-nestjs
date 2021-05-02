import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ReadProductDto } from './dto/read-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductRepository)
        private readonly _productRespository: ProductRepository
    ) {

    }

    async getAll(page) {
        const take = 3
        const skip = page || 0

        const [result, total] = await this._productRespository.findAndCount(
            {
                take: take,
                skip: skip * take
            }
        );

        return {
            data: result.map(product => plainToClass(ReadProductDto, product)),
            count: total,
            totalPages: (total/take).toPrecision(1)
        }
    }



}
