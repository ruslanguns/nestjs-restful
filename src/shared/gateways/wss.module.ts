import { Module } from '@nestjs/common';
import { WssGateway } from './wss.gateway';

@Module({
    providers: [WssGateway],
    exports: [WssGateway],
})
export class WssModule { }
