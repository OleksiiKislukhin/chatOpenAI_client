import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, MessageRole } from 'types/Message';
import { getChatMessages, createMessage } from 'api/messageApi';
import { AppDispatch } from 'reduxHooks/store';

export type MessagesSlice = {
  items: Message[];
  loaded: boolean;
  hasError: boolean;
  currentStream: Message | null;
};

const initialState: MessagesSlice = {
  items: [],
  loaded: true,
  hasError: false,
  currentStream: null,
};

export const fetchMessages = createAsyncThunk(
  'message/fetch',
  (chatId: string) => getChatMessages(chatId),
);

export const createNewMessage = createAsyncThunk(
  'message/create',
  async (newMessage: Omit<Message, 'id' | 'timestamp'>) => {
    return await createMessage(newMessage);
  }
)

export const getAnswerFromAI = createAsyncThunk(
  'message/getAnswerFromAI',
  async (newMessage: Omit<Message, 'id' | 'timestamp'>, { dispatch }) => {
    const { content, chatId } = newMessage;
    const eventSource = new EventSource(
      `${process.env.BASE_URL}/ai_chat?question=${encodeURIComponent(content)}&chatId=${encodeURIComponent(chatId)}`
    );

    eventSource.onmessage = (event: MessageEvent) => {
      if (event.data === '[DONE]') {
        eventSource.close();
        dispatch(streamComplete());
      } else {
        dispatch(addStreamChunk(event.data));
      }
    };

    eventSource.onerror = (error: Event) => {
      eventSource.close();
      dispatch(streamError());
      alert(`SSE error: ${error}`);
    };
  }
);

export const createMessageAndFetchAIResponse = async (chatId: string, content: string, dispatch: AppDispatch) => {
  try {
    const newMessage = {
      chatId: chatId,
      content: content,
      senderRole: MessageRole.User,
    }

    const resultAction = await dispatch(createNewMessage(newMessage));

    if (resultAction.meta.requestStatus === 'fulfilled') {
      dispatch(getAnswerFromAI(newMessage));
    } else {
      alert('Failed to create a new message');
    }
  } catch (error) {
    alert(`Error dispatching new message: ${error}`);
  }
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addStreamChunk: (state, action: PayloadAction<string>) => {
      if (!state.currentStream) {
        state.hasError = false;
        state.currentStream = {
          id: (state.items.length + 1).toString(),
          chatId: '',
          content: '',
          senderRole: MessageRole.Chat,
          timestamp: '1',
        };
      }

      state.currentStream.content += action.payload;
    },
    streamComplete: state => {
      if (state.currentStream) {
        state.items.push({ ...state.currentStream });
        state.currentStream = null;
      }
    },
    streamError: state => {
      state.hasError = true;
      state.currentStream = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMessages.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      fetchMessages.fulfilled,
      (state, action: PayloadAction<Message[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(fetchMessages.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    // builder.addCase(createNewMessage.fulfilled, (state, action: PayloadAction<Message[]>) => {
    //   action.payload.forEach(message => state.items.push(message));
    // });

    builder.addCase(createNewMessage.fulfilled, (state, action: PayloadAction<Message>) => {
      state.items = [...state.items, action.payload];
    });

    builder.addCase(createNewMessage.rejected, state => {
      state.hasError = true;
    });
  },
});

export default messagesSlice.reducer;
export const { addStreamChunk, streamComplete, streamError } = messagesSlice.actions;
