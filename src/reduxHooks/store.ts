import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import chatsReducer from './slices/chatsSlice';
import messagesReducer from './slices/messagesSlice';

const rootReducer = combineSlices({
  chats: chatsReducer,
  messages: messagesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const selector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
