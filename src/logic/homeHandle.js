import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { city } from "@/tools/cityName.js";
import { getScenicSpot } from "@/api";

export function hotCityLogic() {
  const page = ref(0);
  const cityMove = (loc, len) => {
    if (loc) {
      page.value += 1;
      if (page.value >= len) {
        page.value = 0;
      }
    } else {
      page.value -= 1;
      if (page.value <= 0) {
        page.value = len - 1;
      }
    }
  };

  const sortImage = (hotCity, page) => {
    const oddData = {};
    hotCity[page].forEach((el, ind) => {
      if (ind % 3 == 1 || ind % 3 == 2) {
        oddData[el.CityID] = {
          single: false,
          double: true,
        };
      } else {
        oddData[el.CityID] = {
          single: true,
          double: false,
        };
      }
    });
    return oddData;
  };

  return {
    cityMove,
    sortImage,
    page,
  };
}

export function activityLogic() {
  const pageIndex = ref(0);
  const buttonStatus = reactive({ back: false, next: true });
  const activityMove = (image, status) => {
    if (image.length > 1) {
      if (status) {
        pageIndex.value += 1;
        console.log(pageIndex.value);
        if (pageIndex.value == image.length - 1) {
          buttonStatus.next = false;
        } else if (pageIndex.value >= 0) {
          buttonStatus.next = true;
          buttonStatus.back = true;
        }
      } else {
        pageIndex.value -= 1;
        console.log(pageIndex.value);
        if (pageIndex.value > 0) {
          buttonStatus.next = true;
          buttonStatus.back = true;
        } else {
          buttonStatus.back = false;
        }
      }
    } else {
      buttonStatus.next = false;
      buttonStatus.back = false;
    }
  };
  return {
    activityMove,
    pageIndex,
    buttonStatus,
  };
}
