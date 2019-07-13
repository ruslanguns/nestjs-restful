import { Module } from '@nestjs/common';
import { WssGateway } from './wss.gateway';
import { UsersService } from './../../controllers/users/users.service';

@Module({
    imports: [],
    providers: [WssGateway],
    exports: [WssGateway],
})
export class WssModule { }
