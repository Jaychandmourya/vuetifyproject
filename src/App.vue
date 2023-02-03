<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="blue lighten-1">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Zignuts </v-list-item-title>
          <v-list-item-subtitle> Technolab </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list flat class="mt-50">
        <v-list-item-group v-model="selectedItem" color="black">
          <!--<v-list-item v-for="(item, i) in items" :key="i" active-class="border" class="mr-3" :ripple="false" :to="item.link" link>-->
          <v-list-item
            v-for="(home, i) in homes"
            :key="i"
            active-class="border"
            class="mr-3"
            :ripple="false"
            :to="home.to"
          >
            <v-list-item-icon>
              <v-icon v-text="home.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="home.title"></v-list-item-title>
          </v-list-item>

          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>mdi-shopping</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Item Category</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="child in childs"
              :key="child.title"
              :to="child.to"
            >
              <v-list-item-icon>
                <v-icon v-text="child.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
              <!--<v-list-item-title :to="child.route">{{ child.title }}</v-list-item-title>-->
            </v-list-item>
          </v-list-group>
          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>mdi-shopping</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Items</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="item in items" :key="item.title" :to="item.to">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <!--<v-list-item-title :to="child.route">{{ child.title }}</v-list-item-title>-->
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
      <!-- vvvc -->
    </v-navigation-drawer>

    <v-app-bar app color="blue lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title>Zignuts</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        <strong> © {{ new Date().getFullYear() }} Zignuts Technolab</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      selectedItem: 0,
      homes: [{ icon: "mdi-home", title: "Dashboard", to: { path: "/" } }],
      childs: [
        {
          icon: "mdi-shopping",
          title: "All Categories",
          to: { path: "/viewcategories" },
        },
        {
          icon: "mdi-marker",
          title: "Add Categories",
          to: { path: "/addcategories" },
        },
      ],
      items: [
        {
          icon: "mdi-shopping",
          title: "All Item",
          to: { path: "/viewitem" },
        },
        {
          icon: "mdi-marker",
          title: "Add New Item",
          to: { path: "/additem" },
        },
      ],
      right: null,
      drawer: null,
    };
  },
};
</script>
<style scoped>
.v-footer {
  background-color: #2196f3;
}
.border {
  border: var(--bs-border-width) var(--bs-border-style) black !important;
}
</style>
