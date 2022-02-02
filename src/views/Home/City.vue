<template>
  <div class="row mb-5">
    <span class="d-flex align-items-center">
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
            <a @click="cityInputSearch(item.CityName.substring(0,2))" class="stretched-link"/>
          </div>
          <img v-if="item.image" class="hotCity-img" :src="item.image" />
          <img v-else class="hotCity-img" src="@/assets/images/no_picture_scenic_spot.jpg" />
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
// inject
const hotCity = inject("hotCity");
const cityInputSearch = inject("cityInputSearch");

const {
  cityMove,
  sortImage,
  page
} = hotCityLogic()

const oddData = computed(() => {
  return sortImage(hotCity,page.value);
});


</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/home/city.scss";
</style>
