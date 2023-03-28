import io from 'socket.io-client';
import React, {useState, useEffect} from 'react';
import {Message, MessageWithKey} from "@/types/message";
import {ChatBubbleForeign, ChatBubbleOwn} from "@/components/chat/ChatBubble";
import {Panel} from "@/components/util/Panel";

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
            setMessages(currentMsg => [
                {author: msg.author, message: msg.message, timestamp: msg.timestamp},
                ...currentMsg
            ]);

            console.log(messages);
        });
    };

    const sendMessage = async () => {
        if(message === '') return;

        socket.emit('createChatMessage', {author: chosenUsername, message, timestamp: Date.now()});
        setMessage('');
    }

    const handleKeypress = (e:any) => {
        if(e.keyCode === 13){
            if(message){
                sendMessage()
            }
        }
    };

    return (
        <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-primaryDark">
            <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
                {!chosenUsername ? (
                    <>
                        <h3 className="font-bold text-white text-xl">
                            Enter your name:
                        </h3>
                        <input
                            type="text"
                            placeholder="Your name..."
                            value={username}
                            className="p-3 rounded-md outline-none"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                setChosenUsername(username);
                            }}
                            className="bg-white rounded-md px-4 py-2 text-xl"
                        >
                            Chat
                        </button>
                    </>
                ) : (
                    <>
                        <Panel>
                            <div className="h-full last:border-b-0 overflow-y-auto pr-3 flex flex-col-reverse">
                                {messages.map((message, key) => {

                                    const msg: MessageWithKey = {...message, key}

                                    return msg.author === chosenUsername? (
                                        <ChatBubbleOwn author={msg.author} message={msg.message} timestamp={msg.timestamp} key={msg.key}/>
                                    ):(
                                        <ChatBubbleForeign author={msg.author} message={msg.message} timestamp={msg.timestamp} key={msg.key}/>
                                    );
                                })}
                            </div>
                            <div className="divider"/>
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
                                    className="w-10 h-10 bg-purple rounded-full"
                                    onClick={() => {
                                        sendMessage();
                                    }}
                                >
                                    <i className="bi bi-send-fill icon-black icon-size-m"></i>
                                </button>
                            </div>
                        </Panel>
                    </>
                )}
            </div>
        </div>
    );
}