import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../../config';
import { UsersService } from '../../controllers/users/users.service';

@Injectable()
export class JwtWsGuard implements CanActivate {
    constructor(public userService: UsersService) {}

    async canActivate(context: ExecutionContext) {
        const client = context.switchToWs().getClient();
        const cookies: string[] = client.handshake.headers.cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('jwt')).split('=')[1];
        const jwtPayload = jwt.verify(authToken, SECRET);
        const user = await this.userService.findById(jwtPayload.id);
        // Bonus if you need to access your user after the guard
        context.switchToWs().getData().user = user;
        return Boolean(user);
    }
}
