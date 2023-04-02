import { createSignal } from "solid-js";

export interface Message {
  title: string;
  content: string;
  type: "success" | "error";
}

const [getMessageQueue, setMessageQueue] = createSignal<Message[]>([]);

export const messageQueue = getMessageQueue;

export const showMessage = (message: Message) => {
  setMessageQueue((prev) => [message, ...prev]);
};

export const hideMessage = (index: number) => {
  setMessageQueue((prev) => prev.filter((_, i) => i !== index));
};

export const clearMessages = () => {
  setMessageQueue([]);
};
