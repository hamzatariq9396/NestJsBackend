import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Reports } from './reports/report.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mysql_data',
      synchronize: true,
      entities: [User, Reports,Product],
    }),
    UserModule,
   ReportsModule,
   ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
