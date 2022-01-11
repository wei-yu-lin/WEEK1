<template>
  <div class="d-flex justify-content-center align-items-center h-100">
    <div class="flex-column">
      <h1 class="home-text">
        Welc<TextCircle />me t<TextSquare /> Ta
        <span class="d-inline-flex flex-column align-items-center home-text">
          <TextTriangle /><TextRectangle /> </span
        >wan
      </h1>

      <p class="text-light fs-6 fw-light">
        台北、台中、台南、屏東、宜蘭……遊遍台灣
      </p>

      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          name="na_search"
          id="id_search_text"
          placeholder="搜尋關鍵字"
          v-model="searchText"
        />
        <button
          class="btn btn-success"
          id="id_search_button"
          @click="textSearch"
        >
          搜尋
        </button>
      </div>
      <div class="select-wrap">
        <select class="form-select" v-model="categorySelected">
          <option value="" disabled>類別</option>
          <option
            v-for="(item, index) in s_category"
            :value="index"
            :key="`category_${index}`"
          >
            {{ item }}
          </option>
        </select>
        <select class="form-select" v-model="citySelected">
          <option value="" disabled>不分縣市</option>
          <option
            v-for="(item, index) in s_city"
            :value="item.City"
            :key="`city_${index}`"
          >
            {{ item.CityName }}
          </option>
        </select>
        <button class="btn btn-success" @click="optionSearch">
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { searchLogic } from "@/logic/homeHandle.js";
import TextCircle from "@/assets/images/Text-Circle.svg";
import TextSquare from "@/assets/images/Text-Square.svg";
import TextTriangle from "@/assets/images/Text-Triangle.svg";
import TextRectangle from "@/assets/images/Text-Rectangle.svg";
const {
  s_city,
  searchText,
  categorySelected,
  citySelected,
  s_category,
  textSearch,
  optionSearch,
} = searchLogic();
</script>
