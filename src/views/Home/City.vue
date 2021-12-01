<template>
  <div class="row ps-8">
    <span class="d-flex align-items-center" style="margin-top:70px">
      <ThemeTriangle />
      <p class="ps-2 theme-text">熱門城市</p>
    </span>

    <div class="horizon-scroll">
      <div class="position-relative" v-for="(item, index) in hotCity" :key="`hotCity${index}`">
        <div class="hotCity-wrapper">
          <img :class="{'hotCity-img':oddData[item.CityID].single}" :src="item.image" />
        </div>
        <div
          class="
            card-img-overlay
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
        >
          <HotCityGps />
          <p class="hotCity-text">{{ item.CityName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, watch,reactive,ref,computed } from "vue";
import ThemeTriangle from "@/assets/images/Theme-Triangle.svg";
import HotCityGps from "@/assets/images/HotCity-GPS.svg";
import { sortImage } from "@/logic/cityHandle.js";
const hotCity = inject("hotCity");
const fetchData = inject("fetchData");

const oddData = computed(()=>{
  return sortImage(hotCity)
})
fetchData();



</script>

<style lang="scss">
@import "@/assets/scss/custom/city.scss";
</style>
