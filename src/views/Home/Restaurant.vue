<template>
  <section class="row">
    <div class="d-flex align-items-center mb-3">
      <div class="restaurant_title-logo" />
      <p class="ps-2 theme-text">熱門餐廳</p>
    </div>
    <div class="container mb-3">
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        <div
          class="col"
          v-for="(data, index) in restaurant"
          :key="`restaurant_${index}`"
        >
          <div class="border bg-light d-flex flex-column p-2">
            <img
              class="restaurant_card-image"
              :src="data.Picture.PictureUrl1"
              alt=""
            />
            <div class="restaurant_card-wrapper">
              <font-awesome-icon icon="map-marker-alt" class="restaurant-gps" />
              <p class="restaurant_card-address">
                {{ hotelAddress(data.Address) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";
const restaurant = inject("restaurant");
const hotelAddress = (address) => {
  const re = new RegExp("[\u4e00-\u9fa5]+", "g");
  return address
    ? address.match(re)[0] + address.match(re)[1].substring(0, 3)
    : "";
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/HotelRestaurant/restaurant.scss";
</style>
