<template>
  <router-view />
  <Footer />
</template>
<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
<script setup>
import { provide } from "vue";
import { useHome } from "@/tools/useHome.js";
import Footer from "@/components/Layout/Footer.vue";
const {
  fetchData,
  hotCity,
  hotActivity,
  restaurant,
  hotel,
  cityOptionSearch,
  cityInputSearch,
  selectedTypeCity,
  cityOptions,
  searchKeyword,
  resScenicSpot,
  resActivity,
  resRestaurant,
  resHotel,
  curPage,
  showNextPage
} = useHome();
provide("fetchData", fetchData);
provide("hotCity", hotCity);
provide("hotActivity", hotActivity);
provide("restaurant", restaurant);
provide("hotel", hotel);
provide("selectedTypeCity", selectedTypeCity);
provide("resScenicSpot", resScenicSpot);
provide("resActivity", resActivity);
provide("resRestaurant", resRestaurant);
provide("resHotel", resHotel);
provide("cityOptionSearch", cityOptionSearch);
provide("cityInputSearch", cityInputSearch);
provide("cityOptions", cityOptions);
provide("searchKeyword", searchKeyword);
provide("curPage", curPage);
provide("showNextPage", showNextPage);
</script>
