import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { AuthMiddleware } from '../../shared/middlewares/auth.middleware';
import { CheckAdminRoleMiddleware } from '../../shared/middlewares/check-admin-role.middleware';
import { CheckRoleMiddleware } from '../../shared/middlewares/check-role.middleware';
import { WssModule } from '../../shared/gateways/wss.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
    WssModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    WssModule,
  ],
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user/list', method: RequestMethod.GET },
        { path: 'user/:userId', method: RequestMethod.GET },
        { path: 'user/update/:userId', method: RequestMethod.PUT },
        { path: 'user/delete/:userID', method: RequestMethod.DELETE },
      );
    consumer
      .apply(CheckAdminRoleMiddleware)
      .forRoutes(
        { path: 'user/:userId', method: RequestMethod.GET },
      );
    consumer
      .apply(CheckRoleMiddleware)
      .forRoutes(
        { path: 'user/:userId', method: RequestMethod.GET },
      );
  }
}
