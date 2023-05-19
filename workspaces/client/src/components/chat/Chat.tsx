import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {
    MessageWithKey,
    Message
} from '@the-game/common/dist/types/chat/message';
import React, {useState, useEffect, KeyboardEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {SendIcon} from '../svg/send.icon';
import {Panel} from '../util/panel/Panel';
import {ChatBubbleForeign, ChatBubbleOwn} from './ChatBubble';

export const Chat = () => {
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<Message>>([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        setUsername(user.username);

        const onChatMessage: WsListener<Message> = (msg: Message) => {
            setMessages((currentMsg: Message[]) => {
                return [
                    {
                        author: msg.author,
                        message: msg.message,
                        timestamp: msg.timestamp
                    },
                    ...currentMsg
                ];
            });
        };

        if (webSocketState.connected) {
            wsm.registerListener(
                ChatEvent.RECEIVE_GLOBAL_MESSAGE,
                onChatMessage
            );
        }

        return () => {
            wsm.removeListener(ChatEvent.RECEIVE_GLOBAL_MESSAGE, onChatMessage);
        };
    });

    const sendMessage = () => {
        if (message === '') return;

        wsm.emit<Message>({
            event: ChatEvent.SEND_GLOBAL_MESSAGE,
            data: {
                author: username,
                message,
                timestamp: Date.now()
            }
        });

        setMessage('');
    };

    const handleKeypress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (message) {
                sendMessage();
            }
        }
    };

    return (
        <div className="flex items-center h-full justify-center bg-primaryLight dark:bg-primaryDark">
            <Panel className="justify-end">
                <div className="last:border-b-0 h-full overflow-y-auto pr-3 flex flex-col-reverse">
                    {messages.map((message, key) => {
                        const msg: MessageWithKey = {...message, key};

                        return msg.author === username ? (
                            <ChatBubbleOwn
                                author={msg.author}
                                message={msg.message}
                                timestamp={msg.timestamp}
                                key={msg.key}
                            />
                        ) : (
                            <ChatBubbleForeign
                                author={msg.author}
                                message={msg.message}
                                timestamp={msg.timestamp}
                                key={msg.key}
                            />
                        );
                    })}
                </div>
                <div className="divider dark:before:bg-the_game_gray dark:after:bg-the_game_gray" />
                <div className="w-full flex space-x-3">
                    <input
                        id="chat-input"
                        type="text"
                        value={message}
                        placeholder="Write here ..."
                        className="input w-full flex-1 h-10 rounded-full bg-white"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={handleKeypress}
                    />

                    <button
                        className="w-10 h-10 bg-the_game_purple rounded-full"
                        onClick={() => {
                            sendMessage();
                        }}
                    >
                        <SendIcon />
                    </button>
                </div>
            </Panel>
        </div>
    );
};
