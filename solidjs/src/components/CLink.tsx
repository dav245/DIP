
import { A } from "@solidjs/router";
import { Component, JSX } from "solid-js";

export const CLink: Component<{
  children: JSX.Element,
  to: string,
  class?: string,
}> = (props) => {
  return (
    <A href={props.to} class={`link ${props.class}`}>
      {props.children}
    </A>
  )
}

export default CLink;