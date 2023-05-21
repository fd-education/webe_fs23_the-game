export type Message = {
    authorUid: string;
    authorName: string;
    message: string;
    timestamp: number;
};

export type MessageWithKey = Message & {
    uid: string;
};

