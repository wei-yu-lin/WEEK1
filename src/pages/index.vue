<template>
  <div class="container-fluid mb-5">
    <NavBar />
    <div class="home-banner">
      <SearchFilter
      Type = "Home"
      />
    </div>
  </div>
  <div class="container">
    <template v-if="routeQuery.City != undefined">
      <SearchResultsTemp
        :City="routeQuery.City"
        :CityName="routeQuery.CityName"
        :Category="Number(routeQuery.Category)"
        :Type="routeQuery.Type"
      />
    </template>
    <template v-else>
      <City />
      <Activity />
      <Restaurant />
    </template>
  </div>
</template>

<script setup>
import { computed, inject, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import SearchFilter from "@/components/Search/index.vue";
import NavBar from "@/components/Layout/NavBar.vue";
import City from "@/views/Home/City.vue";
import Activity from "@/views/Home/Activity.vue";
import Restaurant from "@/views/Home/Restaurant.vue";
import SearchResultsTemp from "@/components/SearchResultsTemp.vue";
const fetchData = inject("fetchData");
const route = useRoute();
let routeQuery = reactive({});
fetchData();
routeQuery = computed(() => route.query);

// watch(
//   () => route.query,
//   (count) => {
//     if (count.city) {
//       routeCity.value = count.city;
//       routeType.value = count.type;
//     }
//   }
// );
</script>

<style lang="scss">
@import "@/assets/scss/custom/home/index.scss";
</style>
