import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "reset-css";
import "./assets/style.css";
import "leaflet/dist/leaflet.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
createApp(App).use(createPinia()).use(ElementPlus).mount("#app");
