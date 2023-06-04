import {
    IngameMessage,
    MessageWithKey
} from '@the-game/common/dist/types/chat/message';

type ChatBubbleProps = {
    msg: MessageWithKey | IngameMessage;
};

/**
 * Brighter chat bubble to display messages sent by this client.
 * Displays the sending time of the message and the content.
 * @param chatProps
 */
export const ChatBubbleOwn = (chatProps: ChatBubbleProps) => {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble bg-chatBubbleOwn text-black">
                <div className="chat-header opacity-50">
                    <time className="text-xs opacity-50">
                        {' '}
                        {new Date(chatProps.msg.timestamp).toLocaleTimeString(
                            'de-CH',
                            {
                                hour: 'numeric',
                                minute: 'numeric'
                            }
                        )}
                    </time>
                </div>
                {chatProps.msg.message}
            </div>
        </div>
    );
};

/**
 * Darker chat bubble to display messages sent by other clients, received by this client.
 * Displays the name of the sender, the sending time and the content.
 * @param chatProps
 */
export const ChatBubbleForeign = (chatProps: ChatBubbleProps) => {
    return (
        <div className="chat chat-start">
            <div className="chat-bubble bg-chatBubbleForeign text-white">
                <div className="chat-header opacity-50">
                    {chatProps.msg.authorName}
                    <time className="text-xs opacity-50">
                        {' '}
                        {new Date(chatProps.msg.timestamp).toLocaleTimeString(
                            'de-CH',
                            {
                                hour: 'numeric',
                                minute: 'numeric'
                            }
                        )}
                    </time>
                </div>
                {chatProps.msg.message}
            </div>
        </div>
    );
};
