import { StartNewChat } from 'Components/StartNewChat';

export default function Home() {
  return (
    <div className="flex h-full flex-auto flex-col items-center justify-center p-6 dark:bg-gray-800 dark:text-white">
      <p className="text-2xl font-semibold">
        What can I help with?
      </p>
      
      <StartNewChat />
    </div>
  );
}
