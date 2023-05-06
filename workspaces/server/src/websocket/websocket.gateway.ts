import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {ChatEvent} from '@the-game/common/dist/enum/chat-event.enum';
import {WebsocketNamespaces} from '@the-game/common/dist/enum/websocket-namespaces.enum';
import { LoggerService } from '../common/logger/logger.service';
import {Server} from 'socket.io';

@WebSocketGateway({
  namespace: WebsocketNamespaces.CHAT,
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private logger: LoggerService) {
    this.logger.setContext(WebsocketGateway.name);
  }

  @SubscribeMessage(ChatEvent.SEND_GLOBAL_MESSAGE)
  handleMessage(@MessageBody() message: string): void {
    this.logger.info(message);
    this.server.emit(ChatEvent.RECEIVE_GLOBAL_MESSAGE, message);
  }
}
