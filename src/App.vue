<template>
  <router-view/>
</template>

<script setup>
import {provide} from 'vue'
import { useHome } from "@/tools/useHome.js";
const { fetchData,hotCity } = useHome()
provide('fetchData', fetchData)
provide('hotCity', hotCity)

</script>