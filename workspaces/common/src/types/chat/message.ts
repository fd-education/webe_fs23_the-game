export type Message = {
    author: string;
    message: string;
    timestamp: number;
};

export type MessageWithKey = Message & {
    uid: string;
};
