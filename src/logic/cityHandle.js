import { ref, reactive, computed, watch } from "vue";

export const sortImage = (hotCity) => {
  console.log(hotCity);
  const oddData = {}
  hotCity.forEach((el, ind) => {
    if (ind % 2 == 1) {
      oddData[el.CityID] = {
        single:true,
        double:false
      }
    } else {
      oddData[el.CityID] = {
        single: false,
        double: true,
      };
    }
  });
  return oddData
};
