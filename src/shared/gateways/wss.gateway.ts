import { Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { WSS_PORT } from '../../config';
import { JwtWsGuard } from '../guards/wss.guard';

@WebSocketGateway(WSS_PORT)
export class WssGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer() wss;
  private users: number = 0;
  private logger = new Logger('WSS Server');

  onModuleInit() {
    this.logger.log(`WebSockets Listenig on https://localhost:${WSS_PORT}`);
  }

  handleConnection(client) {
    this.users++;
    this.wss.emit('activeUsers', this.users);
    this.logger.log('New client connected');
    this.logger.log(`Actived clients: ${String(this.users)}`);
    client.emit('connection', 'Connected');
  }

  handleDisconnect() {
    this.users--;
    this.wss.emit('activeUsers', this.users);
    this.logger.log('Client disconnected');
    this.logger.log(`Actived clients: ${String(this.users)}`);
  }

  // @UseGuards(JwtWsGuard)
  @SubscribeMessage('nuevoUsuario')
  onEvent(client, data) {
    this.logger.log(client);
    this.logger.log(data);
  }
}
