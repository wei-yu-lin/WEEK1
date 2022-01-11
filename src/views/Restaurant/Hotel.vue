<template>
  <section class="row">
    <div class="d-flex align-items-center mb-3">
      <div class="restaurant_title-logo" />
      <p class="ps-2 theme-text">熱門住宿</p>
    </div>
    <div class="container">
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        <div
          class="col"
          v-for="(data, index) in hotel"
          :key="`hotel_${index}`"
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
              <p class="restaurant_card-address">{{ hotelAddress(data.Address)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";
const hotel = inject("hotel");
const hotelAddress = (address)=> (address) ? address.substring(0,6) : '';
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/home/restaurant.scss";
</style>
