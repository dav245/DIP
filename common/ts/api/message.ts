import type { User } from "./user";

export enum MessageType {
  TYPE_DRAFT = "TYPE_DRAFT",
  TYPE_SENT = "TYPE_SENT",
  TYPE_RECEIVED = "TYPE_RECEIVED",
}

export interface Message {
  subject: string;
  content: string;
  user_id: number;
  type: MessageType;
  owner: User;
  sentFrom: User | null;
  recipients: User[];
}
