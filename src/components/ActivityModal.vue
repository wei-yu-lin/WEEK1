<template>
  <div class="modal fade" :id="`exampleModal${seq}`" tabindex="-1">
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
</script>
