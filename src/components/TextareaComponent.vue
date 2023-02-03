<template>
  <v-textarea
    v-model="description"
    color="teal"
    @input="descriptionfun"
    :rules="descriptionRules"
    required
  >
    <template v-slot:label>
      <div>Description</div>
    </template>
  </v-textarea>
</template>
<script>
export default {
  data() {
    return {
      description: "",
      descriptionRules: [(v) => !!v || "Description is required"],
    };
  },
  methods: {
    descriptionfun() {
      this.$emit("textarea-event", this.description);
    },
  },
};
</script>
