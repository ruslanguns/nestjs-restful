import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { ConfigModule } from 'nestjs-config';
import { ProductModule } from './controllers/product/product.module';
import { UsersModule } from './controllers/users/users.module';
import { AllExceptionsFilter } from './shared/filters/all-exception.filter';
import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-restapi', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    UsersModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // { // enable on production
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
  ],
  exports: [],
})
export class AppModule { }
