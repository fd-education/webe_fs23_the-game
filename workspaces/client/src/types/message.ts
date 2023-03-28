export type Message = {
    author: string;
    message: string;
    timestamp: number
}

type Key = {
    key: number
}

export type MessageWithKey  = Message & Key;

