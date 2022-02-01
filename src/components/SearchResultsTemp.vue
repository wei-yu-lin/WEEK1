<template>

    <section class="row">
      <div class="d-flex align-items-center mb-3">
        <div class="restaurant_title-logo" />
        <p class="ps-2 theme-text" v-if="Category == 0">{{s_category[0]}}-{{ props.CityName }}</p>
        <p class="ps-2 theme-text" v-else>{{s_category[1]}}-{{ props.CityName }}</p>
      </div>

      <div class="container mb-3">
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          <div
            class="col"
            v-for="(data, index) in attractionsArr[0]"
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

                <p v-if="props.Category == 0" class="restaurant_card-address">
                  {{ hotelAddress(data.Address) }}
                </p>
                <p v-else class="restaurant_card-address">
                  {{ data.Location }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination :data-length="attractionsArr[1]"/>
    </section>
</template>

<script setup>
import { inject, computed ,reactive} from "vue";
import Pagination from '@/components/Pagination/index.vue'
const props = defineProps({
  city: String,
  CityName: String,
  Category: Number,
  Type: String,
});
let resInject,resLen;
const s_category = (props.Type)=="Home" ? reactive(["景點", "活動"]):reactive(["餐廳", "住宿"]);
const curPage = inject("curPage");
const sliceItems = inject("sliceItems");

const attractionsArr = computed(() => {
  switch (props.Category) {
    case 0:
      if (props.Type == "Home") {
        resInject = inject("resScenicSpot");
      } else if (props.Type == "Restaurant") {
        resInject = inject("resRestaurant");
      }
        resLen = resInject.length;
      break;
    case 1:
      if (props.Type == "Home") {
        resInject = inject("resActivity");
      }
      else if (props.Type == "Restaurant") {
        resInject = inject("resHotel");
      }
      resLen = resInject.length;
      break;
  }
  return [sliceItems(resInject),resLen]
});

const hotelAddress = (address) => {
  const re = new RegExp("[\u4e00-\u9fa5]+", "g");
  if (address) {
    return address.match(re).length > 1
      ? address.match(re)[0] + address.match(re)[1].substring(0, 3)
      : address.match(re)[0].substring(0, 3);
  } else {
    return "";
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/home/restaurant.scss";
@import "@/assets/scss/custom/home/city.scss";
</style>
