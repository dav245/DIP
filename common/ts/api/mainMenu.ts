export interface MainMenu {
  routeName: string;
  name: string;
}

export const getMainMenu = () => [
  { name: "Nová zpráva", routeName: "newMessage" },
  { name: "Přijaté zprávy", routeName: "inbox" },
  { name: "Odeslané zprávy", routeName: "outbox" },
  { name: "Koš", routeName: "trash" },
];
