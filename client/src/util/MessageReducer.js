import { ACTION } from "./AuthReducer";

export const ACTION_MESSAGE = {
  GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
  GET_USERS_FAILED: "GET_USERS_FAILED",
  CHANGE_SELECTED_USER: "CHANGE_SELECTED_USER",
  GET_MESSAGES_SUCCESS: "GET_MESSAGES_SUCCESS",
  GET_MESSAGES_FAILED: "GET_MESSAGES_FAILED",
  SEND_MESSAGE: "SEND_MESSAGE",
};

export const initMessage = {
  users: [],
  messages: [],
  selectedUser: null,
  errors: [],
};

const MessageReducer = (state = initMessage, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_MESSAGE.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        errors: [],
      };
    case ACTION_MESSAGE.GET_USERS_FAILED:
      return {
        ...state,
        users: [],
        errors: payload,
      };
    case ACTION_MESSAGE.CHANGE_SELECTED_USER:
      return {
        ...state,
        selectedUser: payload,
      };
    case ACTION_MESSAGE.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload,
      };
    case ACTION_MESSAGE.GET_MESSAGES_FAILED:
      return {
        ...state,
        errors: payload,
      };
    case ACTION_MESSAGE.SEND_MESSAGE:
      const newMessages = [...state.messages];
      newMessages.push(payload);
      return {
        ...state,
        messages: newMessages,
      };
    default:
      return state;
  }
};

export default MessageReducer;
