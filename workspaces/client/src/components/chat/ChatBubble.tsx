import {MessageWithKey} from '@the-game/common/dist/types/chat/message';

/**
 * Brighter chat bubble to display messages sent by this client.
 * Displays the sending time of the message and the content.
 * @param msg the message to display
 */
export const ChatBubbleOwn = (msg: MessageWithKey) => {
    return (
        <div className="chat chat-end">
            <div
                className="chat-bubble bg-chatBubbleOwn text-black"
                key={msg.key}
            >
                <div className="chat-header opacity-50">
                    <time className="text-xs opacity-50">
                        {' '}
                        {new Date(msg.timestamp).toLocaleTimeString('de-CH', {
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </time>
                </div>
                {msg.message}
            </div>
        </div>
    );
};

/**
 * Darker chat bubble to display messages sent by other clients, received by this client.
 * Displays the name of the sender, the sending time and the content.
 * @param msg the message to display.
 */
export const ChatBubbleForeign = (msg: MessageWithKey) => {
    return (
        <div className="chat chat-start">
            <div
                className="chat-bubble bg-chatBubbleForeign text-white"
                key={msg.key}
            >
                <div className="chat-header opacity-50">
                    {msg.author}
                    <time className="text-xs opacity-50">
                        {' '}
                        {new Date(msg.timestamp).toLocaleTimeString('de-CH', {
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </time>
                </div>
                {msg.message}
            </div>
        </div>
    );
};
