
import { Component, JSX, Show } from "solid-js";
import CButton from "./CButton";

export const CCard: Component<{
  title?: string;
  closable?: boolean;
  class?: string;
  color?: "primary" | "secondary" | "success" | "error";

  header?: JSX.Element,
  children?: JSX.Element,

  close?: () => void
}> = (props) => {
  return (
    <section class={`card card__${props.color} ${props.class}`}>
      <Show when={props.header || props.title}>
        <header class="card-header">
          <h2 class="header">{props.title}</h2>

          <div class="card-header-toolbox">
            <Show when={props.closable}>
              <CButton
                size="small"
                color={props.color}
                onClick={() => { props.close?.() }}
              >
                X
              </CButton>
            </Show>
          </div>
        </header>
      </Show>
      {props.children}
    </section >
  )
}

export default CCard;