<template>
  <div class="container-fluid mb-5">
    <NavBar />
    <div class="home-banner">
      <SearchFilter/>
    </div>
  </div>
  <div class="container">
    <City />
    <Activity />
    <Restaurant />
  </div>
</template>

<script setup>
import { inject } from "vue";
import SearchFilter from "@/components/Search/index.vue";
import NavBar from "@/components/Layout/NavBar.vue";
import City from "@/views/Home/City.vue";
import Activity from "@/views/Home/Activity.vue";
import Restaurant from "@/views/Home/Restaurant.vue";
const fetchData = inject("fetchData");
fetchData();
</script>

<style lang="scss">
@import "@/assets/scss/custom/home/index.scss";
</style>
