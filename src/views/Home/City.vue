<template>
  <div class="row mb-5">
    <span class="d-flex align-items-center" style="margin-top: 70px">
      <ThemeTriangle />
      <p class="ps-2 theme-text">熱門城市</p>
    </span>
    <div class="horizon-scroll">
      <button class="arrow-icon" @click="cityMove(false,hotCity.length)">
        <font-awesome-icon icon="caret-left" class="text-light"/>
      </button>
      <ul class="hotCity-wrapper">
        <li
          v-for="(item, index) in hotCity[page]"
          :key="`hotCity${index}`"
          :class="{
            'hotCity-content': oddData[item.CityID].single,
            'hotCity-double-content': oddData[item.CityID].double,
          }"
        >
          <div class="hotCity-overlay">
            <HotCityGps/>
            <span class="hotCity-text">{{item.CityName}}</span>
          </div>
          <img class="hotCity-img" :src="item.image" />
        </li>
      </ul>
      <button class="arrow-icon" @click="cityMove(true,hotCity.length)">
        <font-awesome-icon icon="caret-right" class="text-light"/>
      </button>
    </div>
  </div>


</template>

<script setup>
import { inject, computed } from "vue";
import ThemeTriangle from "@/assets/images/Theme-Triangle.svg";
import HotCityGps from "@/assets/images/HotCity-GPS.svg";
import {hotCityLogic} from "@/logic/homeHandle.js";
const hotCity = inject("hotCity");
const fetchData = inject("fetchData");
const {
  cityMove,
  sortImage,
  page
} = hotCityLogic()

const oddData = computed(() => {
  return sortImage(hotCity,page.value);
});

// console.log(hotActivity.image);
fetchData();

</script>

<style lang="scss">
@import "@/assets/scss/custom/home/city.scss";
</style>
