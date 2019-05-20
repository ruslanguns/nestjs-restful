import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { ProductModule } from './controllers/product/product.module';
import { UsersModule } from './controllers/users/users.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-restapi', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [],
})
export class AppModule { }
