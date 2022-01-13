<template>
<button id="qwe" @click="eee ++ ">按我</button>
  {{eee}}
</template>

<script setup>
import { ref,watch } from "vue";
const eee = ref(0);

watch(eee, (www, prevCount) => {
  console.log(www);
  console.log(prevCount);
})

</script>