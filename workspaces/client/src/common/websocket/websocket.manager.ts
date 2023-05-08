import {WebsocketNamespaces} from '@the-game/common/dist/enum/websockets/websocket-namespaces.enum';
import {SetterOrUpdater} from 'recoil';
import io, {Socket} from 'socket.io-client';
import {config} from '../config/config';
import {WebsocketState} from './websocket.state';

export type WsListener<T> = (data: T) => void;

type WsEmitOptions<T> = {
    event: string;
    data?: T;
};

export default class WebSocketManager {
    public readonly socket: Socket;

    public setWebsocketState!: SetterOrUpdater<WebsocketState>;

    private retry = true;

    constructor(namespace: WebsocketNamespaces) {
        this.socket = io(config.backendUrl + '/' + namespace, {
            autoConnect: false,
            transports: ['websocket'],
            withCredentials: true,
            auth: {
                token: localStorage.getItem('token')
            }
        });

        this.onConnect();
        this.onDisconnect();
        this.onException();
    }

    emit<T>(options: WsEmitOptions<T>): this {
        this.socket.emit(options.event, options.data);

        return this;
    }

    getSocketId(): string | null {
        if (!this.socket.connected) {
            return null;
        }

        return this.socket.id;
    }

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
        this.socket.disconnect();
    }

    registerListener<T>(event: string, listener: WsListener<T>): this {
        this.socket.on(event, listener);
        return this;
    }

    removeListener<T>(event: string, listener: WsListener<T>): this {
        this.socket.off(event, listener);
        return this;
    }

    private onConnect(): void {
        this.socket.on('connect', () => {
            this.setWebsocketState((prevState) => ({
                ...prevState,
                connected: true
            }));
        });
    }

    private onDisconnect(): void {
        this.socket.on(
            'disconnect',
            async (reason: Socket.DisconnectReason) => {
                this.setWebsocketState((prevState) => ({
                    ...prevState,
                    connected: false
                }));
            }
        );
    }

    private onException(): void {
        this.socket.on('exception', (data: any) => {
            console.log('exception', data);
        });
    }
}
