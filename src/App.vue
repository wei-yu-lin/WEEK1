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
  selectedCity,
  cityOptions,
  searchKeyword,
  resScenicSpot,
} = useHome();
provide("fetchData", fetchData);
provide("hotCity", hotCity);
provide("hotActivity", hotActivity);
provide("restaurant", restaurant);
provide("hotel", hotel);
provide("selectedCity", selectedCity);
provide("resScenicSpot", resScenicSpot);
provide("cityOptionSearch", cityOptionSearch);
provide("cityOptions", cityOptions);
provide("searchKeyword", searchKeyword);
</script>
