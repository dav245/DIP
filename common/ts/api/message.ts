import type { User } from "./user";

export enum MessageType {
  TYPE_DRAFT = "draft",
  TYPE_SENT = "sent",
  TYPE_RECEIVED = "received",
}

export interface MessageContent {
  id: number;
  subject: string;
  content: string;
  user?: User;
  recipients?: User[];
}

export interface Message {
  id: number;
  user_id: number;
  type: MessageType;
  created_at: string;
  seen_at: string;
  message_content?: MessageContent;
}
