<template>
  <div class="modal fade" :id="`hotactivity${seq}`" tabindex="-1">
    <div class="modal-dialog">
      <div class="d-flex justify-content-center">
        <div class="activity_modal-container">
          <img
            :src="activityData.imageArr[pageIndex]"
            class="activity_modal-image rounded"
          />
          <div class="activity_modal-nextlogo_wrapper">
            <button
              type="button"
              class="activity_modal-backlogo_content"
              v-show="buttonStatus.back"
              @click="activityMove(activityData.imageArr,false)"
            />
            <button
              type="button"
              class="activity_modal-nextlogo_content"
              v-show="buttonStatus.next"
              @click="activityMove(activityData.imageArr,true)"
            />
          </div>
          <h2>{{activityData.ActivityName}}</h2>
          <article>{{activityData.Description}}</article>
          <p>{{computedActivityTime}}</p>
          <p>{{activityData.Location}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed,ref } from "vue";
import { activityLogic } from "@/logic/homeHandle.js";
const props = defineProps({
  seq: Number,
  activityData: Object,
});
const { activityMove, pageIndex, buttonStatus } = activityLogic();
computed(() => pageIndex.value);
computed(() => buttonStatus);
const computedActivityTime = computed(()=>{
  let activityTime = ''
  props.activityData.Time.forEach(element => {
   const newDate = new Date(element);
    activityTime += `${newDate.getFullYear()}/${newDate.getMonth()+1}/${newDate.getDate()} ~ `
  });
  return activityTime.slice(0,-2)
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/custom/ScenicSpot/activity.scss";
</style>