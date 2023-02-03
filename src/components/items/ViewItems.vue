<template>
  <v-data-table
    :headers="headers"
    :items="allitems"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
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
            {{ message }}
          </v-alert>
        </v-col>
        <edit-model-component
          v-if="OpneModel"
          :openmodelclose="openclose"
          :editdatas.sync="editlistdata"
          @close-event="CloseModel($event)"
          @update-event="updatefun($event)"
        ></edit-model-component>
      </div>
      <v-toolbar flat>
        <v-toolbar-title>All Items</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ attrs }">
            <router-link to="/additem"
              ><v-btn color="primary" dark class="mb-2" v-bind="attrs">
                New Item
              </v-btn></router-link
            >
          </template>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm(item)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.pstatus`]="{ item }">
      <v-switch
        v-model="item.pstatus"
        flat
        color="success"
        :label="`${item.pstatus ? 'Active' : 'Deactive'}`"
        @change="changestatus(item)"
      ></v-switch>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
// import Vue from "vue";
// import VeeValidate from "vee-validate";
import EditModelComponent from "./EditModelComponent.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    EditModelComponent,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    OpneModel: false,
    openclose: "",
    message: "",
    alert: false,
    headers: [
      {
        text: "Product Name",
        align: "start",
        sortable: false,
        value: "pname",
      },
      { text: "Categories", value: "categories" },
      { text: "Description", value: "pdescription" },
      { text: "Price", value: "price" },
      { text: "Status", value: "pstatus" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editlistdata: [],
    editedIndex: -1,
    formTitle: "",
    pname: "",
    categories: "",
    description: "",
    price: "",
  }),

  computed: {
    ...mapGetters(["allitems"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$store.dispatch("getitems");
    },
    addModel() {
      this.formTitle = "Add Item";
      this.dialog = true;
    },
    updatefun(value) {
      this.alert = value;
      this.message = "Thanks For Updated Items !";
      setTimeout(() => {
        this.alert = false;
      }, 2000);
      this.initialize();
      // alert(value);
    },
    CloseModel(value) {
      this.OpneModel = value;
    },
    editModel() {
      this.OpneModel = true;
    },
    // Change And Update Status
    async changestatus(item) {
      await axios.put("http://localhost:3000/items/" + item.id, {
        pname: item.pname,
        categories: item.categories,
        pdescription: item.pdescription,
        price: item.price,
        pstatus: item.pstatus ? true : false,
      });
    },
    // edit Open Model and data pass EditModelComponent
    editItem(item) {
      console.log(item);
      this.editedIndex = this.allitems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editlistdata = this.editedItem;
      this.OpneModel = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allitems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(item) {
      Object.assign(this.allitems[this.editedIndex], this.editedItem);
      // this.allitems.splice(this.editedIndex, 1);
      this.$store.dispatch("deleteitems", this.editedItem.id);
      this.editedItem = Object.assign({}, item);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
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
