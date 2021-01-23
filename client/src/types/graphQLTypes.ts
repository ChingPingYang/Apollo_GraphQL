export interface MessageType {
  id: string;
  content: string;
  from: string;
  to: string;
  createdAt: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string;
  createdAt: string;
}
