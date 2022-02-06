<template>
  <div class="horizon-scroll justify-content-center mb-3">
    <button v-show="curPage > 1" class="arrow-icon" @click="curPage -= 1">
      <font-awesome-icon icon="caret-left" class="text-light" />
    </button>
    <p class="mx-3">{{ curPage }}</p>
    <button v-show="showNextPage(props.dataLength)" class="arrow-icon" @click="curPage += 1">
      <font-awesome-icon icon="caret-right" class="text-light" />
    </button>
  </div>
</template>

<script setup>
import { ref,inject,computed } from "vue";
const showNextPage = inject("showNextPage");
const curPage = inject("curPage");
const props = defineProps({
  dataLength: Number
});

</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/ScenicSpot/city.scss";
</style>