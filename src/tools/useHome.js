// Npm Moudle
import { Observable } from "rxjs";
//Vue lib
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, computed, watch } from "vue";
//台灣城市名稱
import { city } from "@/tools/cityName.js";
//取得熱門景點資料
import {
  getScenicSpot,
  getTourismActivity,
  getRestaurant,
  getHotel,
  yo,
} from "@/api";

export function useHome() {
  const route = useRoute();
  const router = useRouter();
  // reactive
  const cityOptions = reactive(city);
  const searchHistory = reactive([]);
  const scenicSpot = reactive([]);
  const hotCity = reactive([]);
  const hotActivity = reactive([]);
  const activity = reactive([]);
  const restaurant = reactive([]);
  const hotel = reactive([]);
  const resScenicSpot = reactive([]);
  const resActivity = reactive([]);
  const resRestaurant = reactive([]);
  const resHotel = reactive([]);

  const selectedTypeCity = reactive({
    City: {
      id: "",
      name: "",
    },
    Type: "",
    Category: 0,
  });

  // ref
  const isLoading = ref(false);
  const curPage = ref(1);

  // computed
  const showNextPage = (dataLength) => dataLength >= curPage.value * 20;

  // Public Function
  const sliceItems = (data) => {
    const resLen = data.length;
    if (curPage.value > 1) {
      if (resLen % ((curPage.value - 1) * 20) < resLen) {
        return data.slice((curPage.value - 1) * 20, curPage.value * 20);
      }
    } else {
      return 20 > resLen ? data : data.slice(0, 20);
    }
  };
  const shuffle = (array) => {
    const shallowArr = JSON.parse(JSON.stringify(array));
    for (let i = shallowArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shallowArr[i], shallowArr[j]] = [shallowArr[j], shallowArr[i]];
    }
    return shallowArr;
  };
  const refetch = () => {
    resScenicSpot.splice(0, resScenicSpot.length);
    resActivity.splice(0, resActivity.length);
    resRestaurant.splice(0, resRestaurant.length);
    resHotel.splice(0, resHotel.length);
  };
  const cityOptionSearch = async (type) => {
    isLoading.value = true;
    selectedTypeCity.Type = type;
    refetch();
    const test = {
      Restaurant: [
        [resRestaurant, getRestaurant],
        [resHotel, getHotel],
      ],
      Home: [
        [resScenicSpot, getScenicSpot],
        [resActivity, getTourismActivity],
      ],
    };
    if (selectedTypeCity.City.id && selectedTypeCity.Category >= 0) {
      const { City, ...other } = selectedTypeCity;
      const resArray = test[selectedTypeCity.Type][selectedTypeCity.Category][0];
      const resApi = test[selectedTypeCity.Type][selectedTypeCity.Category][1];
      switch (selectedTypeCity.Type) {
        case "Restaurant":
          resArray.push(
            ...(
              await resApi(
                {
                  city: selectedTypeCity.City.id,
                },
                "all"
              )
            ).data
          );
          router.push({
            name: "hotelRestaurant",
            query: {
              ...City,
              ...other,
            },
          });
          break;
        case "Home":
          resArray.push(
            ...(
              await resApi(
                {
                  city: selectedTypeCity.City.id,
                },
                "all"
              )
            ).data
          );
          router.push({
            name: "index",
            query: {
              ...City,
              ...other,
            },
          });
          break;
      }
    }
    isLoading.value = false;
  };

  const cityInputSearch = async (keyword) => {
    let restaurantData, hotelData, scenicSpotData;
    refetch();
    isLoading.value = true;
    restaurantData = (
      await getRestaurant(
        {
          filter: `contains(RestaurantName, '${keyword}')`,
        },
        "all"
      )
    ).data;
    hotelData = (
      await getHotel(
        {
          filter: `contains(HotelName, '${keyword}')`,
        },
        "all"
      )
    ).data;
    scenicSpotData = (
      await getScenicSpot(
        {
          filter: `contains(ScenicSpotName, '${keyword}')`,
        },
        "all"
      )
    ).data;

    scenicSpotData.forEach((item) => {
      item.ScenicSpotName = item.ScenicSpotName.replace(/_|ˍ/g, " ");
    });
    restaurantData.forEach((item) => {
      item.RestaurantName = item.RestaurantName.replace(/_|ˍ/g, " ");
    });
    hotelData.forEach((item) => {
      item.HotelName = item.HotelName.replace(/_|ˍ/g, " ");
    });

    resScenicSpot.push(...scenicSpotData);
    resRestaurant.push(...restaurantData);
    resHotel.push(...hotelData);
    // resScenicSpot.push(
    //   ...scenicSpotData.filter((value) => value.ScenicSpotName.match(keyword))
    // );
    // resRestaurant.push(
    //   ...restaurantData.filter((value) => value.RestaurantName.match(keyword))
    // );
    // resHotel.push(
    //   ...hotelData.filter((value) => value.HotelName.match(keyword))
    // );
    isLoading.value = false;
    router.push({
      name: "result",
      query: { keyword },
    });
  };

  //取得資料function
  const fetchHotCity = async () => {
    try {
      const getCityTourism = async (city, index) => {
        //取得各縣市第一張照片，並與city的object回傳
        const resp = (
          await getScenicSpot({
            city: city.City,
          })
        ).data;
        const [firstGet] = shuffle(resp);
        const image = firstGet?.Picture?.PictureUrl1;
        return {
          ...city,
          image,
        };
      };

      const city$ = new Observable((subscriber) => {
        const cities = shuffle(cityOptions);

        cities.map((el, i) => {
          getCityTourism(el, i).then((resp) => {
            subscriber.next(resp);
            if (i === cities.length - 1) {
              subscriber.complete();
            }
          });
        });
      });

      const arr = [];
      city$.subscribe({
        next: (x) => {
          arr.push(x);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          hotCity.splice(0, hotCity.length); // 清空陣列
          hotCity.push(
            ...arr.reduce((prev, cur, idx) => {
              const chunckIndex = Math.floor(idx / 7);
              if (!prev[chunckIndex]) {
                prev[chunckIndex] = [];
                prev[chunckIndex].push(cur);
              } else {
                prev[chunckIndex].push(cur);
              }

              return prev;
            }, [])
          );
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHotActivity = async () => {
    try {
      const getCityActivity = async (city) => {
        //取得各縣市第一張照片，並與city的object回傳
        const resp = (
          await getTourismActivity({
            city: city.City,
          })
        ).data;
        const [firstGet] = shuffle(resp);
        const image = firstGet?.Picture;
        const imageArr = [];
        Object.keys(image).forEach((el) => {
          if (el.search("PictureUrl") === 0) {
            imageArr.push(image[el]);
          }
        });
        const ActivityName = firstGet?.ActivityName;
        const Description = firstGet?.Description;
        const Location = firstGet?.Location;
        const Time = [firstGet?.StartTime, firstGet?.EndTime];
        return {
          Description,
          ActivityName,
          Location,
          Time,
          imageArr,
        };
      };
      const cities = shuffle(cityOptions);
      hotActivity.splice(0, hotActivity.length); // 清空陣列
      cities.forEach((el, ind) => {
        if (ind <= 3) {
          getCityActivity(el).then((CityActivity) => {
            hotActivity.push(CityActivity);
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRestaurant = async () => {
    try {
      restaurant.splice(0, restaurant.length); // 清空陣列
      const restaurantResp = (await getRestaurant()).data;
      restaurant.push(...restaurantResp);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchHotel = async () => {
    try {
      hotel.splice(0, hotel.length); // 清空陣列
      const hotelResp = (await getHotel()).data;
      hotel.push(...hotelResp);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    fetchHotCity();
    fetchHotActivity();
    fetchRestaurant();
    fetchHotel();
  };
  return {
    selectedTypeCity,
    fetchData,
    cityOptionSearch,
    cityInputSearch,
    hotCity,
    hotActivity,
    restaurant,
    hotel,
    cityOptions,
    resScenicSpot,
    resActivity,
    resRestaurant,
    resHotel,
    curPage,
    showNextPage,
    isLoading,
    sliceItems,
  };
}
