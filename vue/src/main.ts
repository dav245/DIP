import "@common/css/main.scss";
import App from "./App.vue";
import { createApp } from "vue";
import { registerRouter } from "@/utils/router";
import { setApiCaller, ApiError } from "@common/ts/api/api";
import { showMessage } from "./utils/messages";

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

const app = createApp(App);

registerRouter(app);

app.mount("#app");
