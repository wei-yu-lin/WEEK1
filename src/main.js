import { createApp } from 'vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";
import App from './App.vue'
import "bootstrap";


const router = createRouter({
  history: createWebHistory(),
  routes
});
const app = createApp(App);
library.add(faCaretLeft, faCaretRight);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");


