import io from 'socket.io-client';
import React, {useState, useEffect} from 'react';
import {Message} from 'postcss';
import {Panel} from '../util/panel/Panel';
import {MessageWithKey} from '../../common/types/message';
import {ChatBubbleForeign, ChatBubbleOwn} from './ChatBubble';

let socket: any;

export const Chat = () => {
    const [username, setUsername] = useState('');
    const [chosenUsername, setChosenUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<Message>>([]);

    useEffect(() => {
        socketInitializer();

        return () => socket.disconnect();
    }, []);

    const socketInitializer = async () => {
        socket = io('http://localhost:3000/');

        socket.on('incomingChatMessage', (msg: Message) => {
            // TODO exchange for Message[] as type
            setMessages((currentMsg: any) => {
                return [
                    {
                        author: msg.author,
                        message: msg.message,
                        timestamp: msg.timestamp
                    },
                    ...currentMsg
                ];
            });

            console.log(messages);
        });
    };

    const sendMessage = async () => {
        if (message === '') return;

        socket.emit('createChatMessage', {
            author: chosenUsername,
            message,
            timestamp: Date.now()
        });
        setMessage('');
    };

    const handleKeypress = (e: any) => {
        if (e.keyCode === 13) {
            if (message) {
                sendMessage();
            }
        }
    };

    return (
        <div className="flex items-center h-full justify-center bg-primaryLight dark:bg-primaryDark">
            <Panel className="justify-end">
                <div className="last:border-b-0 overflow-y-auto pr-3 flex flex-col-reverse">
                    {messages.map((message, key) => {
                        // TODO Replace with MessageWithKey
                        // const msg: MessageWithKey = {...message, key}
                        const msg: any = {...message, key};

                        return msg.author === chosenUsername ? (
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
                <div className="divider" />
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
                        <i className="bi bi-send-fill text-black icon-size-m"></i>
                    </button>
                </div>
            </Panel>
        </div>
    );
};
