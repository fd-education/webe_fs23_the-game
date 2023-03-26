import { Module } from '@nestjs/common';
import {WebsocketGateway} from "./websocket.gateway";
import {LoggerService} from "../logger/logger.service";

@Module({
    providers: [WebsocketGateway, LoggerService]
})
export class WebsocketModule {}
