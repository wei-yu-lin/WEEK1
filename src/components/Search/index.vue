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
          class="form-control me-2"
          name="na_search"
          id="id_search_text"
          placeholder="搜尋關鍵字"
          :disabled="selectedTypeCity.City.id !== ''"
          v-model="searchKeyword"
        />
        <button
          class="btn btn-success"
          id="id_search_button"
          :disabled="searchKeyword == ''"
          @click="cityInputSearch"
        >
          搜尋
        </button>
      </div>
      <div class="select-wrap">
        <select
          class="form-select"
          :disabled="searchKeyword !== ''"
          v-model="selectedTypeCity.Category"
        >
          <option
            v-for="(item, index) in s_category"
            :value="index"
            :key="`category_${index}`"
          >
            {{ item }}
          </option>
        </select>
        <select
          class="form-select"
          :disabled="searchKeyword !== ''"
          v-model="selectedTypeCity.City"
        >
          <option selected :value="{ id: '', name: '' }">請選擇縣市</option>
          <option
            v-for="(item, index) in cityOptions"
            :value="{ id: item.City, name: item.CityName }"
            :key="`city_${index}`"
          >
            {{ item.CityName }}
          </option>
        </select>
        <button
          class="btn btn-success "
          :disabled="selectedTypeCity.City.id == ''"
          @click="cityOptionSearch(props.Type)"
        >
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive } from "vue";
import TextCircle from "@/assets/images/Text-Circle.svg";
import TextSquare from "@/assets/images/Text-Square.svg";
import TextTriangle from "@/assets/images/Text-Triangle.svg";
import TextRectangle from "@/assets/images/Text-Rectangle.svg";
const cityOptionSearch = inject("cityOptionSearch");
const selectedTypeCity = inject("selectedTypeCity");
const cityOptions = inject("cityOptions");
const searchKeyword = inject("searchKeyword");
const cityInputSearch = inject("cityInputSearch");
const props = defineProps({
  Type: String,
});
const s_category =
  props.Type == "Home"
    ? reactive(["景點", "活動"])
    : reactive(["餐廳", "住宿"]);
</script>
