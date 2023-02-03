<template>
  <v-text-field
    v-model="name"
    :rules="nameRules"
    label="Name"
    @input="textinput"
    required
  ></v-text-field>
</template>
<script>
export default {
  props: {
    names: String,
  },
  data() {
    return {
      name: this.names,
      nameRules: [(v) => !!v || "Name is required"],
    };
  },
  methods: {
    textinput() {
      // console.log(this.nameRules);
      this.$emit("text-event", this.name);
    },
  },
};
</script>
