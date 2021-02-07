/* Utils types*/
export interface Route {
  component: React.FC;
  path: string;
  restricted?: boolean;
  exact?: boolean;
  isPrivate: boolean;
}

export type Payload<T> =
  | {
      type: ACTION_AUTH;
      payload: T | any;
    }
  | {
      type: ACTION_MESSAGE;
      payload: T | any;
    };

export interface MenuItem {
  id: number;
  name: string;
  path: string;
}

export interface InputError {
  error: boolean;
  helperText: string;
}

/* Auth types*/
export enum ACTION_AUTH {
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_FAILED = "GET_USER_FAILED",
  REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS",
  REGISTER_USER_FAILED = "REGISTER_USER_FAILED",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
  LOGOUT = "LOGOUT",
}

export interface AuthState {
  loading: boolean;
  authorized: boolean;
  user: User | null;
  errors: any;
}

export interface AuthContextProps {
  state: AuthState;
  dispatch: <T>(action: Payload<T>) => void;
}

/* Message types*/
export enum ACTION_MESSAGE {
  GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
  GET_USERS_FAILED = "GET_USERS_FAILED",
  CHANGE_SELECTED_USER = "CHANGE_SELECTED_USER",
  GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS",
  GET_MESSAGES_FAILED = "GET_MESSAGES_FAILED",
  SEND_MESSAGE = "SEND_MESSAGE",
}

interface User {
  id: string;
  username: string;
}
interface Messages {
  content: string;
  createdAt: string;
  from: string;
  id: string;
  to: string;
}

export type MessageState = {
  users: User[];
  messages: Messages[];
  selectedUser: string | null;
  errors: any;
};

export interface MessageContextProps {
  messageState: MessageState;
  messageDispatch: <T>(action: Payload<T>) => void;
}
