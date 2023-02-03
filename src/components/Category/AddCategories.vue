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
          Thanks For Submit Categories !
        </v-alert>
      </v-col>
    </div>
    <v-col cols="12" md="12">
      <router-link to="/viewcategories" style="float: right"
        ><v-btn color="primary" dark class="mb-2" v-bind="attrs">
          View Categories
        </v-btn></router-link
      >
      <h2>Add Categories</h2>
    </v-col>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
    <v-textarea
      v-model="description"
      :rules="descriptionRules"
      label="Description"
      value=""
      hint="Hint text"
    ></v-textarea>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Submit
    </v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
  </v-form>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    alert: false,
    name: "",
    nameRules: [(v) => !!v || "Categories Name is required"],
    description: "",
    descriptionRules: [(v) => !!v || " Description is required"],
  }),

  methods: {
    // ...mapActions(["addcategories"]),
    validate() {
      let adddata = {
        cname: this.name,
        description: this.description,
        cstatus: true,
      };
      if (this.name == "" && this.description == "") {
        this.$refs.form.validate();
      } else {
        this.$store.dispatch("addcategories", adddata).then(() => {
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
