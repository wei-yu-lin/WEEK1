

<template>
  <div class="container-fluid">
    <NavBar />
      <div class="banner">
        <div class="row justify-content-center align-items-center h-100" >
          <p class="home-text">Welc<TextCircle/>me t<TextSquare/> Ta<span class="d-inline-flex flex-column align-items-center home-text"><TextTriangle/><TextRectangle/></span>wan</p>
        </div>
      </div>
  </div>
    <div class="container">
      <City/>
      <Activity/>
      <Restaurant/>
    </div>
</template>

<script setup>
  import NavBar from "@/components/NavBar.vue";
  import City from "@/views/Home/City.vue"
  import Activity from "@/views/Home/Activity.vue"
  import Restaurant from "@/views/Home/Restaurant.vue"
  import TextCircle from "@/assets/images/Text-Circle.svg";
  import TextSquare from "@/assets/images/Text-Square.svg";
  import TextTriangle from "@/assets/images/Text-Triangle.svg";
  import TextRectangle from "@/assets/images/Text-Rectangle.svg";
</script>

<style lang="scss">
@import "@/assets/scss/custom/home/index.scss";
</style>
