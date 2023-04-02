import type { Component } from 'solid-js';
import { useRoutes } from "@solidjs/router";
import { routes } from './utils/router';
import CMessages from '@c/CMessages';

const App: Component = () => {
  const Routes = useRoutes(routes)

  return (
    <>
      <CMessages />
      <Routes />
    </>
  );
};

export default App;
