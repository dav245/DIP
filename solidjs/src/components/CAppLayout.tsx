
import { useStore } from "@/utils/store";
import { logout } from "@common/ts/api/logout";
import CButton from "./CButton";
import CMainMenu from "./CMainMenu";
import { Component, For, JSX, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

export const CAppLayout: Component<{
  children: JSX.Element,
}> = (props) => {
  const store = useStore();
  const navigate = useNavigate();

  if (!store.isLoggedIn()) {
    navigate('/');
  }

  const doLogout = () => {
    logout();
    store.setIsLoggedIn(false);
    navigate('/');
  };

  const links = [
    { href: import.meta.env.VITE_BACKEND_URL, name: "Backend" },
    { href: import.meta.env.VITE_VUE_APP_URL, name: "Vue" },
    { href: import.meta.env.VITE_SOLID_APP_URL, name: "Solid JS", current: true },
  ];

  return (
    <div class="app-layout">
      <div class="app-layout-header">
        <h1 class="app-layout-header-app-name">Thessenger</h1>

        {store.userName()}

        <CButton class="app-layout-header-sign-out" onClick={doLogout}>
          Odhlásit se
        </CButton>
      </div>
      <div class="app-layout-sidebar">
        <CMainMenu />
      </div>
      <div class="app-layout-content">
        {props.children}
      </div>
      <div class="app-layout-footer">
        <div class="app-layout-footer-links">
          <For each={links}>
            {(link) => <>
              <Show when={link.current}>
                <span class="current-app">
                  {link.name}
                </span>
              </Show>
              <Show when={!link.current}>
                <a href={link.href} target="_blank" class="link">
                  {link.name}
                </a>
              </Show>
            </>
            }
          </For>
        </div>
        <span class="app-layout-footer-footnote">
          Diplomová práce Davida Hrůzy
        </span>
      </div>
    </div>
  )
}

export default CAppLayout;