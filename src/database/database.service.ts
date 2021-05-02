import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigurationEnum } from '../config/config.keys'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { ConnectionOptions } from 'typeorm'

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
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            } as ConnectionOptions
        }

    }),//pueden ir mas conexiones a diferentes bd
]

