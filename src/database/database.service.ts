import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigurationEnum } from '../config/config.keys'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { ConnectionOptions } from 'typeorm'
import { join } from 'path'
import { User } from '../module/user/user.entity';
import { UserDetail } from '../module/user/user.details.entity';
import { Role } from '../module/role/role.entity';
import { Product } from '../module/product/product.entity';
import { Category } from '../module/category/category.entity';

export const databaseProviders = [

    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(confi: ConfigService) {
            return {
                //ssl: true, 
                type: 'postgres' as 'postgres',
                host: confi.get(ConfigurationEnum.HOST),
                username: confi.get(ConfigurationEnum.USERNAME),
                port: parseInt(confi.get(ConfigurationEnum.DATABASE_PORT)),
                database: confi.get(ConfigurationEnum.DATABASE),
                password: confi.get(ConfigurationEnum.PASSWORD),
                entities: [User, UserDetail, Role, Product, Category],
                //entities: [join(__dirname + '/../**/*.entity{.ts,.js}')],
                migrations: [join(__dirname + '/migrations/*{.ts,.js}')],
            } as ConnectionOptions
        }

    }),//pueden ir mas conexiones a diferentes bd
]

