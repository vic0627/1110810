import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// css reset
import "reset-css";

// css
import "./assets/style.css";

// leaflet
import "leaflet/dist/leaflet.css";

// element+
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";


createApp(App).use(createPinia()).use(ElementPlus).mount("#app");
