<template>
  <div class="row">
    <span class="d-flex align-items-center mb-3">
      <ThemeTriangle />
      <p class="ps-2 theme-text">熱門活動</p>
    </span>
    <div
      class="col-md-6 mb-3"
      v-for="(Activity, index) in hotActivity"
      :key="index"
      style="height: 228"
    >
      <div class="card h-100 justify-content-center">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="Activity.image.PictureUrl1" class="activity-image rounded" />
          </div>
          <div class="col-md-8">
            <div class="card-body justify-content-between" id="description">
              <h5 class="card-title text-truncate">
                {{ Activity.ActivityName }}
              </h5>
              <p class="activity-description">
                {{ Activity.Description }}
              </p>

              <div class="activity-card-footer">
                <div class="wrap">
                  <img
                    src="src/assets/images/HotCity-GPS.svg"
                    class="hotcity-gps"
                  />
                  <small class="text-muted">{{ Activity.Location }}</small>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-bs-toggle="modal"
                  :data-bs-target="`#exampleModal${index}`"
                >
                  活動詳情
                </button>
                <ActivityModal :seq="index" :activityData="Activity"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import ActivityModal from "@/components/ActivityModal.vue";
import ThemeTriangle from "@/assets/images/Theme-Triangle.svg";
import { inject } from "vue";
const hotActivity = inject("hotActivity");
</script>

<style lang="scss">
@import "@/assets/scss/custom/home/activity.scss";
</style>
