import "@common/css/main.scss";
import App from "./App.svelte";
import { setApiCaller, ApiError } from "@common/ts/api/api";
import { showMessage } from "./utils/messages";
import { loadToken } from "@common/ts/api/tokenStore";
import { loadUserId, loadUserName } from "@common/ts/api/userIdStore";

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

const app = new App({
  target: document.getElementById("app"),
});

export default app;
