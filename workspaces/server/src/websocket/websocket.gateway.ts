import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {LoggerService} from "../logger/logger.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class WebsocketGateway{
    @WebSocketServer()
    server: any;

    constructor(private logger: LoggerService) {
        this.logger.setContext(WebsocketGateway.name);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void{
        this.logger.info(message);
        this.server.emit('message', message);
    }
}