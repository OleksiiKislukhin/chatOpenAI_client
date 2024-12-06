import { Chat } from "types/Chat";

export function getChatUrl(chat: Chat): string {
  return `${chat.title}:chatId=${chat.id}`;
}
