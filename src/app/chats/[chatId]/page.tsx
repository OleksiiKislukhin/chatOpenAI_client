import { ChatNewMessage } from 'Components/ChatNewMessage';
import { MessageList } from 'Components/MessageList';

type Params = {
  params: {chatId: string}
};

export default async function ChatPage({ params }: Params) {
  const { chatId } = await params;
  
  return (
    <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4 dark:bg-gray-900 dark:text-white">
      <MessageList chatId={chatId} />
      <ChatNewMessage chatId={chatId} />
    </div>
  );
}
