import { useStore } from "@/utils/store";
import { useNavigate } from "@solidjs/router";
import { Component, JSX } from "solid-js"

export const CGuestLayout: Component<{ children: JSX.Element }> = (props) => {
  const store = useStore();
  const navigate = useNavigate();

  if (store.isLoggedIn()) {
    navigate('/new-message');
  }

  return (
    <main class="guest-layout">
      {props.children}
    </main>
  )
}

export default CGuestLayout;