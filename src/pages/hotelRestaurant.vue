<template>
  <div class="container-fluid mb-5">
    <NavBar />
    <div class="restaurant-banner">
      <SearchFilter/>
    </div>
  </div>
  <div class="container">
    <Restaurant/>
    <Hotel />
  </div>
</template>

<script setup>
import { inject } from "vue";
import NavBar from "@/components/Layout/NavBar.vue";
import SearchFilter from "@/components/Search/index.vue";
import Hotel from "@/views/Restaurant/Hotel.vue";
import Restaurant from "@/views/Home/Restaurant.vue";
const fetchData = inject("fetchData");
fetchData();
</script>

<style lang="scss">
@import "@/assets/scss/custom/home/index.scss";
</style>