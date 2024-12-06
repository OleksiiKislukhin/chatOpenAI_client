import { client } from '../utils/fetchClient';
import { Chat } from '../types/Chat';

export const getChats = () => {
  return client.get<Chat[]>('/chats');
};

export const createChat = (data: Omit<Chat, 'id'>) => {
  return client.post<Chat>('/chats', data);
};

export const deleteChat = (chatId: string) => {
  return client.delete(`/chats/${chatId}`);
};
