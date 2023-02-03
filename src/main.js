import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import vuetify from "./plugins/vuetify";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
