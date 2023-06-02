export type Message = {
    authorUid: string;
    authorName: string;
    message: string;
    timestamp: number;
};

export type IngameMessage = Message & {
    gameUid: string
}

export type MessageWithKey = Message & {
    uid: string;
};

