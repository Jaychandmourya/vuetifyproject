<template>
  <v-data-table
    :headers="headers"
    :items="allcategories"
    sort-by="cname"
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
            Thanks For Update Categories !
          </v-alert>
        </v-col>
      </div>
      <v-toolbar flat>
        <v-toolbar-title>View Categories</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ attrs }">
            <router-link to="/addcategories"
              ><v-btn color="primary" dark class="mb-2" v-bind="attrs">
                New Categories
              </v-btn></router-link
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="editedItem.cname"
                      label="Categories Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea
                      label="Description"
                      v-model="editedItem.description"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this Categories</v-card-title
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
    <template v-slot:[`item.cstatus`]="{ item }">
      <v-switch
        v-model="item.cstatus"
        flat
        color="success"
        :label="`${item.cstatus ? 'Active' : 'Deactive'}`"
        @change="changestatus(item)"
      ></v-switch>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    alert: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Categories Name",
        align: "start",
        sortable: true,
        value: "cname",
      },
      { text: "Description", value: "description" },
      { text: "Status", value: "cstatus" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),
  computed: {
    ...mapGetters(["allcategories"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Categories";
    },
  },
  mounted() {
    this.$store.dispatch("getCategories");
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {},

  methods: {
    // status Change
    async changestatus(item) {
      await axios.put("http://localhost:3000/categories/" + item.id, {
        cname: item.cname,
        description: item.description,
        cstatus: item.cstatus ? true : false,
      });
    },
    editItem(item) {
      this.editedIndex = this.allcategories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allcategories.indexOf(item);
      // console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(item) {
      Object.assign(this.allcategories[this.editedIndex], this.editedItem);
      this.$store.dispatch("deleteCategories", this.editedItem.id);
      // this.allcategories.splice(this.editedIndex, 1);
      this.editedItem = Object.assign({}, item);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      // alert(editedIndex);
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    // Update data for json api
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.allcategories[this.editedIndex], this.editedItem);
        this.$store.dispatch("editcategories", this.editedItem).then(() => {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 2000);
        });
      } else {
        console.log(this.editedIndex);
      }
      this.close();
    },
  },
};
</script>
