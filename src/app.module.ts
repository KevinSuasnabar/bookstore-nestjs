import { Module } from '@nestjs/common';
import { ConfigurationEnum } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { AuthModule } from './module/auth/auth.module';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/category/category.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule, AuthModule, ProductModule, CategoryModule],

})
export class AppModule {

  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(ConfigurationEnum.PORT)
  }
}
