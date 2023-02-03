<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <div class="d-flex justify-center ma-4">
      <v-col sm="12">
        <v-alert
          dense
          type="success"
          v-model="alert"
          elevation="16"
          style="opacity: 0.8"
          border="top"
          transition="scale-transition"
          max-height="150"
          dismissible
        >
          Thanks For Submited Item !
        </v-alert>
      </v-col>
    </div>
    <v-col cols="12" md="12">
      <router-link to="/viewitem" style="float: right"
        ><v-btn color="primary" dark class="mb-2" v-bind="attrs">
          View Items
        </v-btn></router-link
      >
    </v-col>
    <h2>Add Item</h2>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
    <v-select
      v-model="categories"
      :items="allcategories"
      label="Select Categories"
      item-text="cname"
      :rules="[(v) => !!v || 'Categoires is required']"
      required
    ></v-select>
    <v-textarea
      v-model="description"
      :rules="descriptionRules"
      label="Description"
      value=""
      hint="Hint text"
    ></v-textarea>
    <v-text-field
      type="number"
      v-model="price"
      :counter="2"
      label="Price"
      :rules="numberRules"
      required
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Submit
    </v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
    alert: false,
    name: "",
    nameRules: [(v) => !!v || "Categories Name is required"],
    categories: "",
    description: "",
    descriptionRules: [(v) => !!v || " Description is required"],
    price: "",
    numberRules: [
      (v) => !!v || "Price is required",
      (v) => (v && v.length <= 2) || "Max 2 Numbers",
    ],
  }),
  computed: {
    ...mapGetters(["allcategories"]),
  },
  created() {
    this.initialize();
  },
  methods: {
    // ...mapActions(["addcategories"]),
    initialize() {
      this.$store.dispatch("getCategories");
    },
    validate() {
      let addata = {
        pname: this.name,
        categories: this.categories,
        pdescription: this.description,
        price: this.price,
        pstatus: true,
      };

      if (
        this.name == "" ||
        this.description == "" ||
        this.categories == "" ||
        this.price == ""
      ) {
        this.$refs.form.validate();
      } else {
        this.$store.dispatch("additems", addata).then(() => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 2000);
          this.$refs.form.reset();
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
