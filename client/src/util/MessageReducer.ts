import { ACTION_MESSAGE, MessageState, Payload } from "../types/types";

export const initMessage: MessageState = {
  users: [],
  messages: [],
  selectedUser: null,
  errors: null,
};

const MessageReducer = (
  state = initMessage,
  action: { type: ACTION_MESSAGE; payload: any }
): MessageState => {
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
