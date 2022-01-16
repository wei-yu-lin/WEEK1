<template>
  <input type="text" v-model="routeCity" />
  <div class="container-fluid mb-5">
    <NavBar />
    <div class="home-banner">
      <SearchFilter />
    </div>
  </div>
  <div class="container">
    <template v-if="routeCity != ''">
      <template v-if="routeType === 1">
        <Activity />
      </template>
      <template v-else>
        <SearchResultsTemp :city="routeCity" />
      </template>
    </template>
    <template v-else>
      <City />
      <Activity />
      <Restaurant />
    </template>
  </div>
</template>

<script setup>
import { inject, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchFilter from "@/components/Search/index.vue";
import NavBar from "@/components/Layout/NavBar.vue";
import City from "@/views/Home/City.vue";
import Activity from "@/views/Home/Activity.vue";
import Restaurant from "@/views/Home/Restaurant.vue";
import SearchResultsTemp from "@/components/SearchResultsTemp.vue";
const fetchData = inject("fetchData");
const route = useRoute();
const routeCity = ref("");
const routeType = ref("");
fetchData();
watch(
  () => route.query,
  (count) => {
    if (count.city) {
      routeCity.value = count.city;
      routeType.value = count.type;
    }
  }
);
// watch(
//   routeCity,
//   (now, prev) => {
//     console.log(now);
//     console.log(prev);
//   },
//   { deep: true },
//   { immediate: true }
// );
</script>

<style lang="scss">
@import "@/assets/scss/custom/home/index.scss";
</style>
