import clsx from 'clsx';
import { ChatBubbleIcon } from 'UI/ChatBubbleIcon';
import { MessageRole } from 'types/Message';

type Props = {
  role: MessageRole;
  message: string;
};

export const MessageItem = ({ role, message }: Props) => {
  const isUser = MessageRole.User === role;
  
  return (
    <div
      className={clsx(
        'rounded-lg col-span-7 p-4',
        isUser ? 'col-start-6' : 'col-start-1'
      )}
    >
      <div
        className={clsx(
          'flex',
          { 'flex-row-reverse': isUser }
        )}
      >
        <div className="flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300">
          {isUser ? (
            <p className="font-semibold text-indigo-500">U</p>
          ) : (
            <p className="h-6 w-6 text-indigo-500">
              <ChatBubbleIcon />
            </p>
          )}
        </div>

        <div
          className={clsx(
            'relative rounded-xl px-5 py-3 text-sm shadow-md',
            isUser
              ? 'mr-4 bg-indigo-900 text-gray-100 border border-indigo-700'
              : 'ml-4 bg-gray-800 text-gray-100 border border-gray-600'
               
          )}
        >
          <div className="break-all">{message}</div>
        </div>
      </div>
    </div>
  );
};
