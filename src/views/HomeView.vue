<template>
  <v-container>
    <v-col col="12">
      <div class="row">
        <div class="col-xl-4 col-sm-6 mb-3">
          <div class="card text-white bg-primary o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-comments"></i>
              </div>
              <div class="mr-5">{{ allcategories.length }} Categories!</div>
            </div>
            <a class="card-footer text-white clearfix small z-1" href="#">
              <router-link to="/viewcategories" style="color: aliceblue"
                ><span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i> </span
              ></router-link>
            </a>
          </div>
        </div>
        <div class="col-xl-4 col-sm-6 mb-3">
          <div class="card text-white bg-success o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-list"></i>
              </div>
              <div class="mr-5">{{ allitems.length }} Items!</div>
            </div>
            <a class="card-footer text-white clearfix small z-1" href="#">
              <router-link to="/viewitem" style="color: aliceblue"
                ><span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i> </span
              ></router-link>
            </a>
          </div>
        </div>
      </div>
    </v-col>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["allcategories"]),
    ...mapGetters(["allitems"]),
  },
  mounted() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getitems");
  },
};
</script>
