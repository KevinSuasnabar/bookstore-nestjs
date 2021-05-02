import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([CategoryRepository]),
        SharedModule,
    ],
    providers: [CategoryService],
    controllers: [CategoryController]
})
export class CategoryModule {}
