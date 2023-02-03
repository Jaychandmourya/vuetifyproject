import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ViewCategories from "../components/Category/ViewCategories.vue";
import AddCategories from "../components/Category/AddCategories.vue";
import ViewItems from "../components/items/ViewItems.vue";
import AddItem from "../components/items/AddItem.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
    },
  },
  // View Categories Routes
  {
    path: "/viewcategories",
    name: "viewcategories",
    component: ViewCategories,
  },
  // Add Categories Routes
  {
    path: "/addcategories",
    name: "addcategories",
    component: AddCategories,
  },
  // Add Items Routes
  {
    path: "/additem",
    name: "additem",
    component: AddItem,
  },
  // Views Items Routes
  {
    path: "/viewitem",
    name: "viewitem",
    component: ViewItems,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
