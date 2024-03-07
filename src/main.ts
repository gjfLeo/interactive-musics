import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import { createHead } from "@unhead/vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import "virtual:uno.css";
import "./assets/styles/main.css";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
});
app.use(router);

const head = createHead();
app.use(head);

const pinia = createPinia();
app.use(pinia);

app.mount("#app");
