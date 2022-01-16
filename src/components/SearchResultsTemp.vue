<template>
  <section class="row">
    <div class="d-flex align-items-center mb-3">
      <div class="restaurant_title-logo" />
      <p class="ps-2 theme-text">熱門{{props.CityName}}景點</p>
    </div>
    <div class="container mb-3">
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        <div
          class="col"
          v-for="(data, index) in attractionsArr"
          :key="`attractions_${index}`"
        >
          <div class="border bg-light d-flex flex-column p-2">
            <img
              class="restaurant_card-image"
              :src="data.Picture.PictureUrl1"
              alt=""
            />
            <div class="restaurant_card-wrapper">
              <img
                src="src/assets/images/HotCity-GPS.svg"
                class="restaurant-gps"
              />
              <p class="restaurant_card-address">
                {{ hotelAddress(data.Address) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="horizon-scroll justify-content-center mb-3">
      <button v-show="curPage>1" class="arrow-icon" @click="nextArr(-1)">
          <font-awesome-icon icon="caret-left" class="text-light"/>
      </button>
      <p class="mx-3">{{curPage}}</p>
      <button v-show="showNextPage" class="arrow-icon" @click="nextArr(1)">
        <font-awesome-icon icon="caret-right" class="text-light"/>
      </button>
    </div>
  </section>
</template>

<script setup>
import { inject, computed } from "vue";
const props = defineProps({
  city:String
})
const resScenicSpot = inject("resScenicSpot")
const curPage = inject("curPage")
const showNextPage = inject("showNextPage")

const nextArr = (num) => {
  curPage.value += num
}

const attractionsArr = computed(() => {
  const resScenicSpotLen = resScenicSpot.length;
  if (curPage.value > 1){
    if (resScenicSpotLen % ((curPage.value-1)*20) < resScenicSpotLen){
      return resScenicSpot.slice((curPage.value-1)*20,curPage.value*20)
    }
  } else {
    return ( 20 > resScenicSpotLen ) ? resScenicSpot : resScenicSpot.slice(0,20)
  }
})

const hotelAddress = (address) => {
  const re = new RegExp("[\u4e00-\u9fa5]+", "g");
  return address
    ? address.match(re)[0] + address.match(re)[1].substring(0, 3)
    : "";
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/home/restaurant.scss";
@import "@/assets/scss/custom/home/city.scss";
</style>
