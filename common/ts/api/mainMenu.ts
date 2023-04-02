export interface MainMenu {
  routeName: string;
  name: string;
}

export const getMainMenu = () => [
  { name: "Nová zpráva", routeName: "newMessage", url: "/new-message" },
  { name: "Přijaté zprávy", routeName: "inbox", url: "/inbox" },
  { name: "Odeslané zprávy", routeName: "outbox", url: "/outbox" },
  { name: "Koš", routeName: "trash", url: "/trash" },
];
