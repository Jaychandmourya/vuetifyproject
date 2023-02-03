<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="editdatalist.pname"
                  :rules="pnameRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-select
                  v-model="editdatalist.categories"
                  :items="allcategories"
                  label="Select Categories"
                  item-text="cname"
                  :rules="[(v) => !!v || 'Categoires is required']"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  v-model="editdatalist.pdescription"
                  color="teal"
                  :rules="pdescriptionRules"
                  required
                >
                  <template v-slot:label>
                    <div>Description</div>
                  </template>
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  type="number"
                  v-model="editdatalist.price"
                  :counter="2"
                  label="Price"
                  :rules="priceRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="editFun(editdatas)">
            Edit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    editdatas: {
      type: Object,
    },
  },
  data() {
    return {
      editdatalist: this.editdatas,
      dialog: true,
      dialogDelete: false,
      alert: false,
      editedIndex: -1,
      formTitle: "Edit Item",
      pname: "",
      pnameRules: [(v) => !!v || "Name is required"],
      categories: "",
      pdescription: "",
      pdescriptionRules: [(v) => !!v || "Description is required"],
      price: "",
      priceRules: [
        (v) => !!v || "Price is required",
        (v) => (v && v.length <= 2) || "Max 2 Numbers",
      ],
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
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
    editFun(editlist) {
      if (
        editlist.pname == "" ||
        editlist.pdescription == "" ||
        editlist.price == "" ||
        editlist.price.length > 2
      ) {
        this.$refs.form.validate();
      } else {
        // alert(editlist);
        this.$store.dispatch("edititems", editlist).then(() => {
          // alert();
          this.dialog = false;
          this.$emit("update-event", true);
        });
      }
    },
    addModel() {
      this.formTitle = "Add Item";
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$emit("close-event", false);
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      // this.close();
      let adddata = {
        pname: this.pname,
        categories: this.categories,
        pdescription: this.description,
        price: this.price,
        pstatus: true,
      };
      if (
        this.pname == "" ||
        this.categories == "" ||
        this.pdescription == "" ||
        this.price == "" ||
        this.price.length > 2
      ) {
        this.$refs.form.validate();
      } else {
        this.$store.dispatch("additems", adddata).then(() => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 2000);
          this.dialog = false;
          this.$refs.form.reset();
        });
      }
    },
    edit() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
