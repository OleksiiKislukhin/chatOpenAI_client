'use client';

import { useAppDispatch, useAppSelector } from 'reduxHooks/hooks';
import { MessageInput } from 'Components/MessageInput';
import * as MessagesActions from 'reduxHooks/slices/messagesSlice';
import * as ChatsActions from 'reduxHooks/slices/chatsSlice';
import { Chat } from 'types/Chat';
import { useRouter } from 'next/navigation';

export const StartNewChat = () => {
  const dispatch = useAppDispatch(); 
  const router = useRouter();
  const {
    items: chats,
  } = useAppSelector(state => state.chats);

  const handleMessage = async (content: string) => {
    const data = { title: `New Chat №${chats.length + 1}` };
    const actionResult = await dispatch(ChatsActions.createNewChat(data));

    if (actionResult.meta.requestStatus === 'fulfilled') {
      const newChat = actionResult.payload as Chat;

      MessagesActions.createMessageAndFetchAIResponse(newChat.id, content, dispatch);

      // const newMessage = {
      //   chatId: newChat.id,
      //   content: content,
      //   senderRole: MessageRole.User,
      // }
  
      // await dispatch(MessagesActions.createNewMessage(newMessage));
      
      router.push(`/chats/${newChat.id}`);
    } else {
      alert('Failed to create a new chat');
    }  
  };
  
  return <MessageInput onSubmit={handleMessage} />;
};
