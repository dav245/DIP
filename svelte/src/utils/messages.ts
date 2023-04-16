import { writable } from "svelte/store";

export interface Message {
  title: string;
  content: string;
  type: "success" | "error";
}

export const messageQueue = writable<Message[]>([]);

export const showMessage = (message: Message) => {
  messageQueue.update((prev) => [...prev, message]);
};

export const hideMessage = (index: number) => {
  messageQueue.update((prev) => prev.filter((_, i) => i !== index));
};

export const clearMessages = () => {
  messageQueue.update((prev) => []);
};
