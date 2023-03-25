import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class WebsocketGateway{
    @WebSocketServer()
    server: any;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void{
        console.log(message);
        this.server.emit('message', message);
    }
}