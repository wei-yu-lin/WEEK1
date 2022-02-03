import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretLeft,
  faCaretRight,
  faSearch,
  faCamera,
  faUtensils,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "virtual:generated-pages";
import App from "./App.vue";
import "bootstrap";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
library.add(faCaretLeft, faCaretRight, faSearch, faCamera, faUtensils, faBed);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
