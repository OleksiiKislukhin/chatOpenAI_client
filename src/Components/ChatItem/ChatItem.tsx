'use client';

import Link from 'next/link';
import { XMarkIcon } from 'UI/XMarkIcon';

import { useAppDispatch } from 'reduxHooks/hooks';
import * as ChatsActions from 'reduxHooks/slices/chatsSlice';
import { Chat } from 'types/Chat';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';


type Props = {
  chat: Chat;
};

export const ChatItem = ({ chat }: Props) => {
  const dispatch = useAppDispatch(); 
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      event.stopPropagation();
      event.preventDefault();
      const deleteResult = await dispatch(ChatsActions.deleteChat(chat.id));

      if (deleteResult.meta.requestStatus === 'fulfilled'
        && pathname === `/chats/${chat.id}`
      ) {
        router.push('/');
      } else {
        alert('Failed to delete chat');
      }
    } catch (error) {
      alert(`Error deleting chat: ${error}`);
    }
  };

  return (
    <Link
      href={`/chats/${chat.id}`}
      className="group relative flex flex-row items-center rounded-xl py-2 hover:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      <div className="ml-2 break-words pr-12 text-left text-sm font-semibold">
        {chat.title}
      </div>

      <div
        className="absolute right-2 ml-auto hidden h-4 w-4 items-center justify-center rounded text-xs leading-none text-primary group-hover:flex dark:text-gray-400 dark:group-hover:text-white"
        onClick={handleClick}
      >
        <XMarkIcon />
      </div>
    </Link>
  );
};
