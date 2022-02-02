<template>
  <NavBar />
  <div class="container-fluid d-md-flex">
    <aside v-if="searchBar" class="col-lg-2 mt-3 d-lg-block d-none">
      <div class="search-bar">
        <header class="search-bar_header">
          <h4>文字搜尋</h4>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="searchBar = false"
          />
        </header>
        <div class="input-group mb-3">
          <input
            type="text"
            placeholder="搜尋關鍵字"
            class="form-control"
            v-model="searchKeyword"
          />
        </div>
        <button
          class="btn btn-danger w-100"
          id="id_search_button"
          :disabled="searchKeyword == ''"
          @click="cityInputSearch(searchKeyword)"
        >
          搜尋
        </button>
      </div>
    </aside>
    <div :class="`${searchBar ? 'col-lg-10' : 'col-lg-12'}`">
      <nav class="my-3">
        <ul class="pagination pagination-lg justify-content-center">
          <li class="page-item">
            <a
              class="page-link"
              href="#ScenicSpot"
              @click.prevent="switchStatus('ScenicSpot')"
            >
              <div class="search-bar_icon">
                <font-awesome-icon icon="camera" />
                <p>景點</p>
              </div>
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="#Restaurant"
              @click.prevent="switchStatus('Restaurant')"
            >
              <div class="search-bar_icon">
                <font-awesome-icon icon="utensils" />
                <p>餐廳</p>
              </div>
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="#Hotel"
              @click.prevent="switchStatus('Hotel')"
            >
              <div class="search-bar_icon">
                <font-awesome-icon icon="bed" />
                <p>旅宿</p>
              </div>
            </a>
          </li>
        </ul>
      </nav>
      <section class="row" id="ScenicSpot" v-if="status == 'ScenicSpot'">
        <div class="container mb-3">
          <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
            <div
              class="col"
              v-for="(data, index) in dataScenicSpot"
              :key="`ScenicSpot_${index}`"
            >
              <div class="border bg-light d-flex flex-column p-2">
                <img
                  v-if="data.Picture.PictureUrl1"
                  class="restaurant_card-image"
                  :src="data.Picture.PictureUrl1"
                  :alt="data.ScenicSpotName"
                />
                <img
                  v-else
                  class="restaurant_card-image"
                  src="@/assets/images/no_picture_scenic_spot.jpg"
                  alt="data.ScenicSpotName"
                />
                <div class="restaurant_card-wrapper">
                  <p class="restaurant_card-address">
                    {{ data.ScenicSpotName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination :data-length="resScenicSpot.length" />
      </section>

      <section class="row" id="Restaurant" v-else-if="status == 'Restaurant'">
        <div class="container mb-3">
          <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
            <div
              class="col"
              v-for="(data, index) in dataRestaurant"
              :key="`restaurant_${index}`"
            >
              <div class="border bg-light d-flex flex-column p-2">
                <img
                  v-if="data.Picture.PictureUrl1"
                  class="restaurant_card-image"
                  :src="data.Picture.PictureUrl1"
                  :alt="data.RestaurantName"
                />
                <img
                  v-else
                  class="restaurant_card-image"
                  src="@/assets/images/no_picture_restaurant.jpg"
                  alt="data.RestaurantName"
                />
                <div class="restaurant_card-wrapper">
                  <p class="restaurant_card-address">
                    {{ data.RestaurantName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination :data-length="resRestaurant.length" />
      </section>

      <section class="row" id="Hotel" v-else-if="status == 'Hotel'">
        <div class="container mb-3">
          <div class="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
            <div
              class="col"
              v-for="(data, index) in dataHotel"
              :key="`hotel_${index}`"
            >
              <div class="border bg-light d-flex flex-column p-2">
                <img
                  v-if="data.Picture.PictureUrl1"
                  class="restaurant_card-image"
                  :src="data.Picture.PictureUrl1"
                  :alt="data.HotelName"
                />
                <img
                  v-else
                  class="restaurant_card-image"
                  src="@/assets/images/no_picture_hotel.jpg"
                  alt="data.HotelName"
                />
                <div class="restaurant_card-wrapper">
                  <p class="restaurant_card-address">
                    {{ data.HotelName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination :data-length="resHotel.length" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/Layout/NavBar.vue";
import Pagination from "@/components/Pagination/index.vue";
const route = useRoute();
// ref
const searchKeyword = ref(route.query.keyword);
const searchBar = ref(true);
// inject
const cityInputSearch = inject("cityInputSearch");
const resScenicSpot = inject("resScenicSpot");
const resRestaurant = inject("resRestaurant");
const resHotel = inject("resHotel");
const sliceItems = inject("sliceItems");
const curPage = inject("curPage");
let status = ref("ScenicSpot");
// computed
const dataScenicSpot = computed(() => sliceItems(resScenicSpot));
const dataRestaurant = computed(() => sliceItems(resRestaurant));
const dataHotel = computed(() => sliceItems(resHotel));
// function
const switchStatus = (category) => {
  status.value = category;
  curPage.value = 1;
};
</script>

<style scoped>
@import "@/assets/scss/custom/home/restaurant.scss";
</style>
