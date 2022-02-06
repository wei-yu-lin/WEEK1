<template>
  <div ref="first">
    <div ref="second">靠北</div>
  </div>
</template>

<script setup>
import { ref,reactive,onMounted } from "vue";

const first = ref(null)
const second = ref(null)

onMounted(()=>{
  console.log(first.value);
})
</script>