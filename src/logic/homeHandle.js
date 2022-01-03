import { ref } from "vue";
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
  const activityMove = (image) => {
    console.log(image);
  };
  return {
    activityMove,
  };
}
