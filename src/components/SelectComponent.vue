<template>
  <v-select
    v-model="categories"
    :items="allcategories"
    label="Select Categories"
    item-text="cname"
    :rules="[(v) => !!v || 'Categoires is required']"
    @change="categoriesdata"
    required
  ></v-select>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    categories: null,
    // items: ["Item 1", "Item 2", "Item 3", "Item 4"],
  }),
  computed: {
    ...mapGetters(["allcategories"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$store.dispatch("getCategories");
    },
    categoriesdata() {
      this.$emit("select-event", this.categories);
    },
  },
};
</script>
