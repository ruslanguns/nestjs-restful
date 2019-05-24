import { CanActivate, ExecutionContext, Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';

/*
    Custom imports for AuthService, jwt secret, etc...
*/
import { SECRET } from '../../config';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../controllers/users/users.service';

// FIXME: Guard de momento no se ha probado...
@Injectable()
export class WsJwtGuard implements CanActivate {

    private logger = new Logger('WSS Guard');

    constructor(private readonly userService: UsersService) { }

    async canActivate(context: ExecutionContext) {

        const client = context.switchToWs().getClient();
        const cookies: string[] = client.handshake.headers.cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('token')).split('=')[1];

        if (authToken && (authToken as string).split('=')[1]) {
            const decoded: any = jwt.verify(authToken, SECRET);
            const user = await this.userService.findById(decoded.id);

            if (!user) {
                this.logger.error('GUARD — Not authorized');
                throw new HttpException('GUARD — Not authorized', HttpStatus.UNAUTHORIZED);
            }

            context.switchToWs().getData().user = user;
            return Boolean(user);

        } else {
            this.logger.error('GUARD — Not authorized');
            throw new HttpException('GUARD — Not authorized', HttpStatus.UNAUTHORIZED);
        }
    }
}