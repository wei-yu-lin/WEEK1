<template>
  <div class="container-fluid mb-5">
    <NavBar />
    <div class="restaurant-banner">
      <SearchFilter
      Type = "Restaurant"
      />
    </div>
  </div>
  <div class="container">
    <template v-if="routeQuery.id != undefined">
      <SearchResultsTemp
        :City="routeQuery.id"
        :CityName="routeQuery.name"
        :Category="Number(routeQuery.Category)"
        :Type="routeQuery.Type"
      />
    </template>
    <template v-else>
      <Restaurant />
      <Hotel />
    </template>
  </div>
</template>

<script setup>
import { inject, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/Layout/NavBar.vue";
import SearchFilter from "@/components/Search/index.vue";
import Hotel from "@/views/Restaurant/Hotel.vue";
import Restaurant from "@/views/Home/Restaurant.vue";
import SearchResultsTemp from "@/components/SearchResultsTemp.vue";
const fetchData = inject("fetchData");
const route = useRoute();
let routeQuery = reactive({});
fetchData();
routeQuery = computed(() => route.query);

</script>

<style lang="scss">
@import "@/assets/scss/custom/home/index.scss";
</style>
