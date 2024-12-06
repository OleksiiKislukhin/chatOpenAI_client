'use client';

import { ChatItem } from '../ChatItem';
import { Chat } from 'types/Chat';

type Props = {
  chats: Chat[];
};

export const ChatList = ({ chats }: Props) => {
  return (
    <div className="mt-4 flex flex-col space-y-1 overflow-y-auto dark:bg-gray-900 dark:text-white">
      {chats.map(chat => 
        <ChatItem chat={chat} key={chat.id} />
      )}
    </div>
  );
};
