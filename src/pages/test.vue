<template>
  <div class="container-fluid">
    <NavBar />
    <div class="sticky-left mt-3">
      <div class="search-bar">
        <div class="input-group mb-3">
          <input
            type="text"
            placeholder="搜尋關鍵字"
            class="form-control"
            v-model="searchKeyword"
          />
        </div>
        <button
          class="btn btn-success w-100"
          id="id_search_button"
          :disabled="searchKeyword == ''"
          @click="cityInputSearch(searchKeyword,'Search')"
        >
          搜尋
        </button>
      </div>
    </div>

    <nav class="my-3">
      <ul class="pagination pagination-lg justify-content-center">
        <li class="page-item">
          <a
            class="page-link"
            href="#ScenicSpot"
            @click.prevent="status = 'ScenicSpot'"
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
            @click.prevent="status = 'Restaurant'"
          >
            <div class="search-bar_icon">
              <font-awesome-icon icon="utensils" />
              <p>餐廳</p>
            </div>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#Hotel" @click.prevent="status = 'Hotel'">
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
                class="restaurant_card-image"
                :src="data.Picture.PictureUrl1"
                :alt="data.ScenicSpotName"
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
      <Pagination :data-length="resScenicSpot.length"/>
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
                class="restaurant_card-image"
                :src="data.Picture.PictureUrl1"
                :alt="data.RestaurantName"
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
      <Pagination :data-length="resRestaurant.length"/>
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
                class="restaurant_card-image"
                :src="data.Picture.PictureUrl1"
                :alt="data.HotelName"
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
      <Pagination :data-length="resHotel.length"/>
    </section>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import NavBar from "@/components/Layout/NavBar.vue";
import Pagination from '@/components/Pagination/index.vue'
const searchKeyword = ref("");
const cityInputSearch = inject("cityInputSearch");
const resScenicSpot = inject("resScenicSpot");
const resRestaurant = inject("resRestaurant");
const resHotel = inject("resHotel");
const sliceItems = inject("sliceItems");
const status = ref("ScenicSpot");
const dataScenicSpot = computed(() => sliceItems(resScenicSpot));
const dataRestaurant = computed(() => sliceItems(resRestaurant));
const dataHotel = computed(() => sliceItems(resHotel));
</script>

<style scoped>
@import "@/assets/scss/custom/home/restaurant.scss";
</style>
