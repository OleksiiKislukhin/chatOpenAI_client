export interface Message {
  id: string;
  chatId: string;
  content: string;
  senderRole: MessageRole;
  timestamp: string;
};

export enum MessageRole {
  User = 'user',
  Chat = 'ai-chat',
}