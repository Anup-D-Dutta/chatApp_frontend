
import { createSlice } from '@reduxjs/toolkit';
import { NEW_MESSAGE_ALERT } from '../../constants/event';

// Local storage helper
const getOrSaveFromStorage = ({ key, get, value }) => {
  const storageKey = `myApp_${key}`;

  if (get) {
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : null;
  }

  if (value !== undefined) {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }
};

const initialState = {
  notificationCount: 0,
  newMessageAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount += 1;
    },
    resetNotification: (state) => {
      state.notificationCount = 0;
    },
    setNewMessageAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );
      if (action.payload.reset) {
        if (index !== -1) {
          state.newMessageAlert[index].count = 0;
        }
        // If not found, do nothing
      } else {
        if (index !== -1) {
          state.newMessageAlert[index].count =
            typeof state.newMessageAlert[index].count === 'number'
              ? state.newMessageAlert[index].count + 1
              : 1;
        } else {
          state.newMessageAlert.push({
            chatId: action.payload.chatId,
            count: 1,
          });
        }
      }
    },
    clearChatState: (state) => {
      state.notificationCount = 0;
      state.newMessageAlert = [];
      localStorage.removeItem(`myApp_${NEW_MESSAGE_ALERT}`);
    },
  },
});

export const {
  incrementNotification,
  resetNotification,
  setNewMessageAlert,
  clearChatState,
} = chatSlice.actions;

export default chatSlice;
