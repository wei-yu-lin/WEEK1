<template>
  <Loading :active.sync="isLoading" loader="dots"/>
  <router-view />
  <Footer />
</template>
<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
<script setup>
import { provide,onMounted } from "vue";
import { useHome } from "@/tools/useHome.js";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
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
  resScenicSpot,
  resActivity,
  resRestaurant,
  resHotel,
  curPage,
  showNextPage,
  isLoading,
  sliceItems
} = useHome();
onMounted(()=>{
  setTimeout(() => {
    isLoading.value = false
  }, 3000);
  isLoading.value = true
})
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
provide("curPage", curPage);
provide("showNextPage", showNextPage);
provide("isLoading", isLoading);
provide("sliceItems", sliceItems);
</script>
