import Vue from "vue";
import Vuex from "vuex";
import categories from "./categoriestore/categories";
import item from "./items/item";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    item,
  },
  strict: false,
});
