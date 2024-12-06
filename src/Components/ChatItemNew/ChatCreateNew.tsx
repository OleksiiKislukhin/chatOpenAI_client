'use client';

import { useAppDispatch } from 'reduxHooks/hooks';
import * as ChatsActions from 'reduxHooks/slices/chatsSlice';
import { useRouter } from 'next/navigation';
import { Chat } from 'types/Chat';
import { useState } from 'react';
import clsx from 'clsx';

export const ChatItemNew = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [chatTitle, setChatTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormAction = async () => {
    const newChatTitle = chatTitle.trim();

    if (!newChatTitle) {
      setErrorMessage('Chat title cannot be empty');
      return;
    }

    setErrorMessage("");

    const data = { title: newChatTitle };
    const actionResult = await dispatch(ChatsActions.createNewChat(data));

    if (actionResult.meta.requestStatus === 'fulfilled') {
      const newChat = actionResult.payload as Chat;
      
      setChatTitle("");
      router.push(`/chats/${newChat.id}`);
    } else {
      alert('Failed to create a new chat');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatTitle(e.target.value);
    setErrorMessage("");
  }

  return (
    <form
      action={handleFormAction}
    >
      <div className="relative flex flex-col w-full">
        <input
          value={chatTitle}
          type="text"
          placeholder="Create new chat"
          autoComplete="off"
          className={clsx(
            'box-border flex h-10 w-full rounded-xl border pl-4 pr-12 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:border-indigo-500',
            errorMessage ? 'border-red-500' : ''
          )}
          onChange={handleInputChange}
        />
        {errorMessage && (
          <p className="text-red-500 text-xs italic mt-1">{errorMessage}</p>
        )}
        {chatTitle.trim() && (
          <button
            type="submit"
            className="absolute right-0 flex h-10 w-12 items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
          >
            <div>+</div>
          </button>
        )}
      </div>
    </form>
  );
};
