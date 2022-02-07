<template>
  <section class="row">
    <span class="d-flex align-items-center mb-3">
      <ThemeTriangle />
      <p class="ps-2 theme-text">熱門活動</p>
    </span>
    <div class="col-md-6 col-12 mb-3" v-for="(Activity, index) in hotActivity" :key="index">
      <div class="card">
        <div class="row g-0" style="min-height: 242px">
          <div class="col-md-4 d-flex align-items-center">
            <img :src="Activity.imageArr[0]" class="activity-image rounded" />
          </div>
          <article class="col-md-8 position-relative">
            <header class="card-body justify-content-between mb-3" id="description">
              <h5 class="card-title text-truncate">{{ Activity.ActivityName }}</h5>
              <p class="activity-description">{{ Activity.Description }}</p>
            </header>
            <footer class="activity-card-footer">
              <div>
                <font-awesome-icon icon="map-marker-alt" class="hotcity-gps" />
                <small class="text-muted">{{ Activity.Location }}</small>
              </div>
              <button
                type="button"
                class="btn btn-outline-danger"
                data-bs-toggle="modal"
                :data-bs-target="`#hotactivity${index}`"
              >活動詳情</button>
            </footer>
            <ActivityModal :seq="index" :activityData="Activity" />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ActivityModal from "@/components/Modal/index.vue";
import ThemeTriangle from "@/assets/images/Theme-Triangle.svg";
import { inject } from "vue";
const hotActivity = inject("hotActivity");
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/ScenicSpot/activity.scss";
</style>
