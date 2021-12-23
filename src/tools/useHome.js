// Npm Moudle
import { Observable } from "rxjs";
//Vue lib
import { useRoute } from "vue-router";
import { ref, reactive, computed, watch } from "vue";
//台灣城市名稱
import { city } from "@/tools/cityName.js";
//取得熱門景點資料
import { getScenicSpot, getTourismActivity } from "@/api";

export function useHome() {
  const route = useRoute();

  const isLoading = ref(false);
  const loadingCount = ref(0);
  const cityOptions = reactive(city);
  const searchHistory = reactive([]);

  const hotCity = reactive([]);
  const hotActivity = reactive([]);

  const scenicSpot = reactive([]);
  const displayScenicSpot = computed(() =>
    scenicSpot.slice(0, selectedType.value ? perPageItem : 10)
  );

  const activity = reactive([]);
  const displayActivity = computed(() =>
    activity.slice(0, selectedType.value ? perPageItem : 10)
  );

  const restaurant = reactive([]);
  const displayRestaurant = computed(() =>
    restaurant.slice(0, selectedType.value ? perPageItem : 10)
  );

  const hotel = reactive([]);
  const displayHotel = computed(() =>
    hotel.slice(0, selectedType.value ? perPageItem : 10)
  );

  const curPage = ref(1);

  const shuffle = (array) => {
    const shallowArr = JSON.parse(JSON.stringify(array));

    for (let i = shallowArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shallowArr[i], shallowArr[j]] = [shallowArr[j], shallowArr[i]];
    }
    return shallowArr;
  };

  const showNextPage = computed(() => {
    switch (selectedType.value) {
      case "ScenicSpot":
        return scenicSpot.length >= perPageItem;
      case "Hotel":
        return hotel.length >= perPageItem;
      case "Restaurant":
        return restaurant.length >= perPageItem;
      case "Activity":
        return activity.length >= perPageItem;
    }

    if (route.path.includes("/hotel")) {
      return hotel.length >= perPageItem || restaurant.length >= perPageItem;
    }

    return scenicSpot.length >= perPageItem || activity.length >= perPageItem;
  });

  watch(curPage, () => refetch());

  const searchKeyword = ref("");


  const clearSearchHistory = () => {
    searchHistory.splice(0, searchHistory.length);
  };

  const searchByKeyword = async () => {
    let filter;
    if (searchKeyword.value) {
      filter = `contains(Name,'${searchKeyword.value}')`;
      const keywordIdx = searchHistory.indexOf(searchKeyword.value);
      if (keywordIdx > -1) {
        searchHistory.splice(keywordIdx, 1);
      }

      searchHistory.unshift(searchKeyword.value);
    }

    let city, type;

    if (selectedCity.City) city = selectedCity.City;
    if (selectedType.value) type = selectedType.value;

    // switch (type) {
    //   case 'ScenicSpot':
    //     return fetchScenicSpot()
    //   case 'Hotel':
    //     return fetchHotel()
    //   case 'Restaurant':
    //     return fetchRestaurant()
    //   case 'Activity':
    //     return fetchActivity()
    // }

    if (route.path.includes("hotel")) {
      const resp1 = await getHotel({ city, filter, page: curPage.value });
      const resp2 = await getRestaurant({ city, filter, page: curPage.value });
      hotel.splice(0, hotel.length);
      restaurant.splice(0, restaurant.length);
      hotel.push(...resp1.data);
      restaurant.push(...resp2.data);
      return;
    }

    const resp1 = await getActivity({ city, filter, page: curPage.value });
    const resp2 = await getScenicSpot({ city, filter, page: curPage.value });
    scenicSpot.splice(0, scenicSpot.length);
    activity.splice(0, activity.length);
    scenicSpot.push(...resp2.data);
    activity.push(...resp1.data);
  };

  const refetch = () => {
    scenicSpot.splice(0, scenicSpot.length);
    activity.splice(0, activity.length);
    hotel.splice(0, hotel.length);
    restaurant.splice(0, restaurant.length);

    searchByKeyword();
  };


  const selectedCity = reactive({
    City: "",
    CityCode: "",
    CityID: "",
    CityName: "",
    CountyID: "",
  });

  const reset = () => {
    selectedType.text = "";
    selectedType.value = "";
    selectedCity.City = "";
    selectedCity.CityCode = "";
    selectedCity.CityID = "";
    selectedCity.CityName = "";
    selectedCity.CountyID = "";
    searchKeyword.value = "";

    curPage.value = 1;
    fetchData();
  };

  const fetchHotCity = async () => {
    loadingCount.value += 1;
    try {
      const getCityTourism = async (city) => {
        //取得各縣市第一張照片，並與city的object回傳
        const resp = (await getScenicSpot({ city: city.City })).data;
        const [firstGet] = shuffle(resp);
        const image = firstGet?.Picture?.PictureUrl1;
        return { ...city, image };
      };

      const city$ = new Observable((subscriber) => {
        const cities = shuffle(cityOptions);
        cities.map((el, i) => {
          getCityTourism(el).then((resp) => {
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
          arr.push(x)
        },
        error: (error) => {
          console.error(error);
          loadingCount.value -= 1;
        },
        complete: () => {
          hotCity.splice(0, hotCity.length); // 清空陣列
          hotCity.push(
            ...arr.reduce((prev, cur, idx) => {
              const chunckIndex = Math.floor(idx / 7);
                if (!prev[chunckIndex]){
                  prev[chunckIndex] = []
                  prev[chunckIndex].push(cur)
                } else {
                  prev[chunckIndex].push(cur)
                }

              return prev

            }, [])
          );
          loadingCount.value -= 1;
        },
      });
    } catch (e) {
      console.error(e);
    }
  };


  const fetchHotEvent = async () => {
    try {
      const getCityActivity = async (city) => {

        //取得各縣市第一張照片，並與city的object回傳
        const resp = (await getTourismActivity({ city: city.City })).data;
        const [firstGet] = shuffle(resp);
        const image = firstGet?.Picture?.PictureUrl1;
        return { ...city, image };
      };
      const city$ = new Observable((subscriber) => {
        const cities = shuffle(cityOptions);
        cities.forEach((el, ind) => {
          if (ind<=3){
            getCityActivity(el)
          }
        });
      });

      const arr = [];
      city$.subscribe({
        next: (x) => {
          arr.push(x);
        },
        error: (error) => {
          console.error(error);
          loadingCount.value -= 1;
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
          loadingCount.value -= 1;
        },
      });

    } catch (error) {
      console.error(error);
    }

  }
  const fetchData = async () => {
    fetchHotCity()
    fetchHotEvent()
    //   fetchRestaurant()
    //   fetchHotel()
  };

  watch(loadingCount, () => {
    isLoading.value = !(loadingCount.value === 0);
  });

  return {
    fetchData,
    hotCity,
  };
}