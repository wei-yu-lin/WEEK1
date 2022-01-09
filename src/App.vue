<template>
  <router-view/>
</template>
<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
<script setup>
import {provide} from 'vue'
import { useHome } from "@/tools/useHome.js";
const { fetchData,hotCity,hotActivity,restaurant } = useHome()
provide('fetchData', fetchData)
provide('hotCity', hotCity)
provide('hotActivity', hotActivity)
provide('restaurant', restaurant)
</script>