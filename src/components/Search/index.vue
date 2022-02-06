<template>
  <div class="d-flex justify-content-center align-items-center h-100">
    <div class="flex-column">
      <h1 class="home-text d-none d-md-block">Welc<TextCircle />me t<TextSquare /> Taiwan</h1>
      <p class="text-light fs-6 fw-light mb-3 d-none d-md-block">
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
          class="btn btn-danger"
          id="id_search_button"
          :disabled="searchKeyword == ''"
          @click="cityInputSearch(searchKeyword)"
        >
          搜尋
        </button>
      </div>
      <div class="select-wrap" v-if="s_category">
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
          class="btn btn-danger"
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
import { inject, reactive, ref } from "vue";
import TextCircle from "@/assets/images/Text-Circle.svg";
import TextSquare from "@/assets/images/Text-Square.svg";
const searchKeyword = ref("");
const cityOptionSearch = inject("cityOptionSearch");
const selectedTypeCity = inject("selectedTypeCity");
const cityOptions = inject("cityOptions");
const cityInputSearch = inject("cityInputSearch");
const props = defineProps({
  Type: String,
});
let s_category;
switch (props.Type) {
  case "Home":
    s_category = reactive(["景點", "活動"]);
    break;
  case "Restaurant":
    s_category = reactive(["餐廳", "住宿"]);
    break;
}
</script>

