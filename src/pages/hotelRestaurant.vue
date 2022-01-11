

<template>
  <div class="container-fluid mb-5">
    <NavBar />
      <div class="restaurant-banner">
        <div class="row justify-content-center align-items-center h-100" >
          <p class="home-text">Welc<TextCircle/>me t<TextSquare/> Ta<span class="d-inline-flex flex-column align-items-center home-text"><TextTriangle/><TextRectangle/></span>wan</p>
        </div>
      </div>
  </div>
    <div class="container">
      <Restaurant/>
      <Hotel/>
    </div>
</template>

<script setup>
  import { inject } from "vue";
  import NavBar from "@/components/NavBar.vue";
  import Hotel from "@/views/Restaurant/Hotel.vue"
  import Restaurant from "@/views/Home/Restaurant.vue"
  import TextCircle from "@/assets/images/Text-Circle.svg";
  import TextSquare from "@/assets/images/Text-Square.svg";
  import TextTriangle from "@/assets/images/Text-Triangle.svg";
  import TextRectangle from "@/assets/images/Text-Rectangle.svg";
  const fetchData = inject("fetchData");
  fetchData();
</script>

<style lang="scss">
@import "@/assets/scss/custom/home/index.scss";
</style>
