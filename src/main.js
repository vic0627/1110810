import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import "reset-css";
import "./assets/style.css";
import "leaflet/dist/leaflet.css";
createApp(App).use(createPinia()).mount("#app");
