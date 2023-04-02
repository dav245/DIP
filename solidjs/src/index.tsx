/* @refresh reload */
import { render } from 'solid-js/web';

import "@common/css/main.scss";
import App from './App';
import { loadToken } from '@common/ts/api/tokenStore';
import { loadUserId, loadUserName } from '@common/ts/api/userIdStore';
import { ApiError, setApiCaller } from '@common/ts/api/api';
import { showMessage } from './utils/messages';
import { Router } from '@solidjs/router';

setApiCaller(async (call) => {
  try {
    return await call();
  } catch (ex) {
    const error = ex as ApiError;

    showMessage({
      title: "Chyba!",
      content: error.data.message,
      type: "error",
    });

    throw ex;
  }
});

loadToken();
loadUserId();
loadUserName();

const root = document.getElementById('app');

render(() => (
  <Router>
    <App />
  </Router>
), root!);
