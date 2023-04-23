import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LoggerService } from '../common/logger/logger.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: any;

  constructor(private logger: LoggerService) {
    this.logger.setContext(WebsocketGateway.name);
  }

  @SubscribeMessage('createChatMessage')
  handleMessage(@MessageBody() message: string): void {
    this.logger.info(message);
    this.server.emit('incomingChatMessage', message);
  }
}
