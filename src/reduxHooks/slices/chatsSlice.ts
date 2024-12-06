import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat } from 'types/Chat';
import { getChats, createChat, deleteChat as deleteChatApi } from 'api/chatApi';

export type ChatsSlice = {
  items: Chat[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: ChatsSlice = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchChats = createAsyncThunk(
  'chats/fetch',
  () => getChats(),
);

export const createNewChat = createAsyncThunk(
  'chats/create',
  async (newChat: Omit<Chat, 'id'>) => {
    return await createChat(newChat);
  }
)

export const deleteChat = createAsyncThunk(
  'chats/delete',
  async (chatId: string) => {
    await deleteChatApi(chatId);

    return chatId;
  }
);

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchChats.pending, state => {
      state.loaded = false;
    });

    builder.addCase(
      fetchChats.fulfilled,
      (state, action: PayloadAction<Chat[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(fetchChats.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(createNewChat.fulfilled, (state, action: PayloadAction<Chat>) => {
      state.items.push(action.payload);
    });

    builder.addCase(createNewChat.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(deleteChat.fulfilled, (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(chat => chat.id !== action.payload);
    });

    builder.addCase(deleteChat.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(deleteChat.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default chatsSlice.reducer;
export const { } = chatsSlice.actions;
