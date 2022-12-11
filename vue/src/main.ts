import "./common/css/main.scss";
import App from "./App.vue";
import { createApp } from "vue";
import { registerRouter } from "@/utils/router";

const app = createApp(App);

registerRouter(app);

app.mount("#app");
