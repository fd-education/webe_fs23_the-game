import io from 'socket.io-client';
import {useState, useEffect} from 'react';

let socket: any;

type Message = {
  author: string;
  message: string;

  timestamp: number
}

export default function Chat(){
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
                <div className="flex flex-col justify-end bg-secondaryDark h-[20rem] min-w-[33%] rounded-2lg shadow-around p-3">
                  <div className="h-full last:border-b-0 overflow-y-auto pr-3 flex flex-col-reverse">
                    {messages.map((msg, i) => {
                      return msg.author === chosenUsername? (
                              <div className="chat chat-end">
                                <div className="chat-bubble bg-chatBubbleOwn text-black" key={i}>
                                  <div className="chat-header opacity-50">
                                  <time className="text-xs opacity-50"> {new Date(msg.timestamp).toLocaleTimeString('de-CH', {hour: "numeric", minute: "numeric"})}</time>
                                </div>
                                  {msg.message}
                                </div>
                              </div>
                    ):(
                              <div className="chat chat-start">
                                <div className="chat-bubble bg-chatBubbleForeign text-white" key={i}>
                                    <div className="chat-header opacity-50">
                                        {msg.author}
                                        <time className="text-xs opacity-50"> {new Date(msg.timestamp).toLocaleTimeString('de-CH', {hour: "numeric", minute: "numeric"})}</time>
                                    </div>
                                    {msg.message}

                                </div>
                              </div>
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
                        <i className="bi bi-send-fill icon-black"></i>
                      </button>
                  </div>
                </div>
              </>
          )}
        </div>
      </div>
  );
}