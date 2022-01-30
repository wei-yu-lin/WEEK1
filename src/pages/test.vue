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
          @click="cityInputSearch(searchKeyword)"
        >
          搜尋
        </button>
      </div>
    </div>

    <nav class="my-3">
      <ul class="pagination pagination-lg justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#ScenicSpot">
            <div class="search-bar_icon">
              <font-awesome-icon icon="camera" />
              <p>景點</p>
            </div>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#Restaurant">
            <div class="search-bar_icon">
              <font-awesome-icon icon="utensils" />
              <p>餐廳</p>
            </div>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#Hotel">
            <div class="search-bar_icon">
              <font-awesome-icon icon="bed" />
              <p>旅宿</p>
            </div>
          </a>
        </li>
      </ul>
    </nav>

    <section class="row" id="ScenicSpot">
      <div class="container mb-3">
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          <div
            class="col"
            v-for="(data, index) in resScenicSpot"
            :key="`ScenicSpot_${index}`"
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
                  {{ data.Address }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="row" id="Restaurant">
      <div class="container mb-3">
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          <div
            class="col"
            v-for="(data, index) in resRestaurant"
            :key="`restaurant_${index}`"
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
                  {{ data.Address }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="row" id="Hotel">
      <div class="container mb-3">
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          <div
            class="col"
            v-for="(data, index) in resHotel"
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
                <p class="restaurant_card-address">
                  {{ data.Address }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import NavBar from "@/components/Layout/NavBar.vue";
const searchKeyword = ref("");
const cityInputSearch = inject("cityInputSearch");
const resScenicSpot = inject("resScenicSpot");
const resRestaurant = inject("resRestaurant");
const resHotel = inject("resHotel");
</script>
