import Vue from "vue";
import VueRouter from "vue-router";
import VueCookie from 'vue-cookie'
import axios from 'axios'
import App from "./App.vue";
import { makeServer } from "./server";
import { Server, Response } from "miragejs";
import Arenas from "./components/Arenas";
import Login from "./components/Login";

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
    { path: "/", component: Login },
    { path: "/arenas", component: Arenas },
  ]
});

router.beforeEach((to, from, next) => {
  var newRoute = checkAuthorizationAndAuthentication(to)
  window.scrollTo(0, 0)
  if (newRoute !== '') {
    next(newRoute)
  } else {
    next()
  }
})

var myApp = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

axios.interceptors.response.use(null, function (error) {
  if (VueCookie.get('token') && error.response.status === 401) {
    myApp.$children[0].logout()
    return router.push('/')
  }
  return Promise.reject(error)
})

// Diese Methode Prüft ob der Nutzer noch authentifziert und authorisiert ist und return wenn den Pfad, wo der nutzer als nächstes hingeleitet werden soll
function checkAuthorizationAndAuthentication (to) {
  if (to.meta.permissions) {
    if (VueCookie.get('token')) {
      if (!isAuthorized(to)) {
        return ('/permissiondenied')
      }
    } else {
      return ('/')
    }
  } else {
    // Fuer den Fall dass jemand eingeloggt ist und die Loginseite aufruft
    if (VueCookie.get('token')) {
      return ('arenas')
    }
  }
  return ''
}

function isAuthorized (to) {
  return (JSON.parse(VueCookie.get('roles')).indexOf(to.meta.permissions.roles[0]) >= 0)
}