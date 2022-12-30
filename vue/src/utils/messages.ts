import { ref } from "vue";

export interface Message {
  title: string;
  content: string;
  type: "success" | "error";
}

export const messageQueue = ref<Message[]>([]);

export const showMessage = (message: Message) => {
  messageQueue.value.push(message);
};

export const hideMessage = (index: number) => {
  messageQueue.value.splice(index, 1);
};

export const clearMessages = () => {
  messageQueue.value.splice(0);
};
