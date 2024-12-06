'use client';

import { useAppDispatch } from 'reduxHooks/hooks';
import { MessageInput } from 'Components/MessageInput';
import { createMessageAndFetchAIResponse } from 'reduxHooks/slices/messagesSlice';

type Props = {
  chatId: string;
};

export const ChatNewMessage = ({ chatId }: Props) => {
  const dispatch = useAppDispatch(); 
  
  const handleMessage = (content: string) => {
    createMessageAndFetchAIResponse(chatId, content, dispatch);
  };
  
  return <>
  <MessageInput onSubmit={handleMessage} />
  </>
};
