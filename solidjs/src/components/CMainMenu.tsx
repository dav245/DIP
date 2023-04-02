
import { getMainMenu } from "@common/ts/api/mainMenu";
import CLink from "./CLink";
import { checkNewMessages } from "@common/ts/api/checkNewMessages";
import { useStore } from "@/utils/store";
import { Component, For, JSX, onCleanup, Show } from "solid-js";
import { useMatch } from "@solidjs/router";

export const CMainMenu: Component = () => {

  const mainMenus = getMainMenu();

  const store = useStore();

  let timeoutId: NodeJS.Timeout | null = null;

  const refreshUnreadMessages = async () => {
    const response = await checkNewMessages();
    store.setMenuNewMessages(response?.numberOfNewMessages ?? 0);
    timeoutId = setTimeout(refreshUnreadMessages, 1000 * 60);
  };

  refreshUnreadMessages();

  onCleanup(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });

  return (
    <nav>
      <ul class="main-menu">
        <For each={mainMenus}>
          {(mainMenu) => <li>
            <CLink
              to={mainMenu.url}
              class={`main-menu-item ${useMatch(() => mainMenu.url)() ? 'main-menu-item__active' : ''}`}
            >
              {mainMenu.name}
              <Show when={mainMenu.routeName === 'inbox' && store.menuNewMessages()}>
                <span class="menu-badge">
                  {store.menuNewMessages()}
                </span>
              </Show>
            </CLink>
          </li>
          }
        </For>
      </ul>
    </nav>
  )
}

export default CMainMenu;