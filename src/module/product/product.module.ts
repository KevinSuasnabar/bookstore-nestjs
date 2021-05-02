import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({

    imports: [
        TypeOrmModule.forFeature([ProductRepository]),
        SharedModule,
    ],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule { }
