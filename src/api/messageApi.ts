import { client } from '../utils/fetchClient';
import { Message } from 'types/Message';

export const getChatMessages = (chatId: string) => {
  return client.get<Message[]>(`/messages?chatId=${chatId}`);
};

export const createMessage = (data: Omit<Message, 'id' | 'timestamp'>) => {
  return client.post<Message>('/messages', data);
};
  