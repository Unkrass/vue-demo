import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { makeServer } from "./server";
import { Server, Response } from "miragejs";
import Arenas from "./components/Arenas";

Vue.config.productionTip = false;
Vue.use(VueRouter);

if (window.Cypress) {
  new Server({
    environment: "test",
    routes() {
      let methods = ["get", "put", "patch", "post", "delete"];
      methods.forEach(method => {
        this[method]("/*", async (schema, request) => {
          let [status, headers, body] = await window.handleFromCypress(request);
          return new Response(status, headers, body);
        });
      });
    }
  });
} else {
  // this is the mirage development and production server
  makeServer();
}

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Arenas },
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
