<template>
  <div class="modal fade" :id="`exampleModal${seq}`" tabindex="-1">
    <div class="modal-dialog">
      <div class="d-flex justify-content-center">
        <div class="activity_modal-container">
          <img :src="activityData.image.PictureUrl1" class="activity_modal-image rounded" />
          <div class="activity_modal-nextlogo_wrapper">
            <button type="button" class="activity_modal-nextlogo_content" @click="activityMove(activityData.image)"/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {activityLogic} from "@/logic/homeHandle.js";
const props = defineProps({
  seq: Number,
  activityData: Object,
});
const {activityMove} = activityLogic()
</script>
