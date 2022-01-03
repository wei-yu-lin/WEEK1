<script setup>
import { ref } from "vue";
import TaiwanLogo from "@/assets/images/TaiwanLogo.svg";
import Circle from "@/assets/images/Circle.svg";
import Square from "@/assets/images/Square.svg";
import Triangle from "@/assets/images/Triangle.svg";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand ps-8" href="#">
        <TaiwanLogo />
      </a>

      <div class="navbar-nav pe-8">
        <a class="nav-link navbar-font link-danger" href="#"><span class="pe-2"><Triangle/></span>台灣景點</a>
        <a class="nav-link navbar-font link-warning" href="#"><span class="pe-2"><Square/></span>美食住宿</a>
        <a class="nav-link navbar-font link-success" href="#"><span class="pe-2"><Circle/></span>景點交通</a>
      </div>
    </div>
  </nav>
  <router-view />
</template>


