import io from 'socket.io-client';
import {useState, useEffect} from 'react';

let socket: any;

type Message = {
  author: string;
  message: string;
}

export default function Home(){
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
          ...currentMsg,
        {author: msg.author, message: msg.message}
      ]);

      console.log(messages);
    });
  };

  const sendMessage = async () => {
    if(message === '') return;

    socket.emit('createChatMessage', {author: chosenUsername, message});
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
      <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-primaryDark drop-shadow-2xl shadow-shadowDark">
        <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
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
                <p className="font-bold text-white text-xl">
                  User: {username}
                </p>
                <div className="flex flex-col justify-end bg-secondaryDark h-[20rem] min-w-[33%] rounded-md shadow-md ">
                  <div className="h-full last:border-b-0 overflow-y-scroll">
                    {messages.map((msg, i) => {
                      return msg.author === chosenUsername? (
                              <div className="chat chat-end">
                                <div className="chat-bubble bg-chatBubbleOwn text-black" key={i}>
                                  {msg.author} : {msg.message}
                                </div>
                              </div>
                    ):(
                              <div className="chat chat-start">
                                <div className="chat-bubble bg-chatBubbleForeign text-white" key={i}>
                                  {msg.author} : {msg.message}
                            </div>
                          </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-300 w-full flex rounded-bl-md">
                    <input
                        type="text"
                        placeholder="Your chat..."
                        className="outline-none py-2 px-2 rounded-bl-md flex-1"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={handleKeypress}
                    />
                    <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                      <button
                          className="group-hover:text-white px-3 h-full bg-blue-500 text-white font-bold"
                          onClick={() => {
                            sendMessage();
                          }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </>
          )}
        </main>
      </div>
  );
}