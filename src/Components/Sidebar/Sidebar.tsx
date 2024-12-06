'use client';
import Link from 'next/link';

import { ChatList } from 'Components/ChatList';
import { useAppDispatch, useAppSelector } from 'reduxHooks/hooks';
import { useEffect } from 'react';
import * as ChatsActions from 'reduxHooks/slices/chatsSlice';
import { ChatItemNew } from 'Components/ChatItemNew';

export const Sidebar = () => {
  const disptach = useAppDispatch();
  const {
    items: chats,
  } = useAppSelector(state => state.chats);

  useEffect(() => {
    disptach(ChatsActions.fetchChats());
  }, [disptach]);

  return (
    <div className="box-border flex w-1/5 flex-shrink-0 flex-col bg-white dark:bg-gray-900 py-8 pl-6 pr-2">
      <Link
        href={`/`}
        className="flex h-12 w-full cursor-pointer flex-row items-center"
      >
        <div className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">Home</div>
      </Link>

      <div className="mt-8 flex h-auto flex-col overflow-y-auto overflow-x-hidden">
        <ChatItemNew />
        <ChatList chats={chats} />
      </div>
    </div>
  );
};
