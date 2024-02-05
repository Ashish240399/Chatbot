type Chat = {
  text: string;
  sendBy: string;
  timestamp: number;
  like: boolean | null;
};

type Conversation = {
  chatId: number;
  chats: Chat[];
  rating: number;
  feedback: string;
};
