<template>
  <v-text-field
    type="number"
    v-model="price"
    :counter="2"
    label="Price"
    @input="pricefun"
    :rules="numberRules"
    required
  ></v-text-field>
</template>
<script>
export default {
  data: () => ({
    price: "",
    numberRules: [
      (v) => !!v || "Price is required",
      (v) => (v && v.length <= 2) || "Max 2 Numbers",
    ],
  }),
  methods: {
    pricefun() {
      this.$emit("number-event", this.price);
    },
  },
};
</script>
