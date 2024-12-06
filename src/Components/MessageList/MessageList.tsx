"use client"

import { MessageItem } from 'Components/MessageItem';

import { useAppDispatch, useAppSelector } from 'reduxHooks/hooks';
import React, { useEffect, useRef } from 'react';
import * as MessagesActions from 'reduxHooks/slices/messagesSlice'; 

type Props = {
  chatId: string;
};

export const MessageList = ({ chatId }: Props) => {
  const disptach = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    items: messages,
    currentStream,
  } = useAppSelector(state => state.messages);

  useEffect(() => {
    disptach(MessagesActions.fetchMessages(chatId));
  }, [disptach, chatId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, currentStream]);

  return (
    <div ref={containerRef} className="mb-4 flex h-full flex-col overflow-x-hidden">
      <div className="grid grid-cols-12 gap-y-2">
        {messages.map(message => {
          const { id, senderRole, content } = message;

          return (
            <MessageItem role={senderRole} message={content} key={id} />
          );
        })}
        {currentStream?.content && (
          <MessageItem role={currentStream.senderRole} message={currentStream.content}/>
        )}
      </div>
    </div>
  );
}
