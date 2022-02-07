<template>
  <div class="modal fade" :id="`hotactivity${seq}`" tabindex="-1">
    <div class="modal-dialog">
      <div class="d-md-flex justify-content-center">
        <main class="activity_modal-container">
          <div class="modal-header">
            <h1>{{ activityData.ActivityName }}</h1>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- activity_modal-image -->
          <img :src="activityData.imageArr[pageIndex]" class="activity_modal-image rounded" />
          <div class="activity_modal-nextlogo_wrapper">
            <button
              type="button"
              class="activity_modal-backlogo_content"
              v-show="buttonStatus.back"
              @click="activityMove(activityData.imageArr, false)"
            />
            <button
              type="button"
              class="activity_modal-nextlogo_content"
              v-show="buttonStatus.next"
              @click="activityMove(activityData.imageArr, true)"
            />
          </div>

          <p>{{ activityData.Description }}</p>
          <p>{{ computedActivityTime }}</p>
          <p>{{ activityData.Location }}</p>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { activityLogic } from "@/logic/homeHandle.js";
const { activityMove, pageIndex, buttonStatus } = activityLogic();
const props = defineProps({
  seq: Number,
  activityData: Object,
});

onMounted(() => {
  const myModal = document.getElementById(`hotactivity${props.seq}`)
  myModal.addEventListener('hidden.bs.modal', function (event) {
    pageIndex.value = 0
    buttonStatus.next = true
    buttonStatus.back = false
  })

})
const computedActivityTime = computed(() => {
  let activityTime = ''
  props.activityData.Time.forEach(element => {
    const newDate = new Date(element);
    activityTime += `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()} ~ `
  });
  return activityTime.slice(0, -2)
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/ScenicSpot/activity.scss";
</style>