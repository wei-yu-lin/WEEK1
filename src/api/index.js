import { defaultIfEmpty, raceWith } from "rxjs";
import { GET } from "./requestHeaders";

const defaultParam = {
  top: 10,
};

const defaultFilter =
  "Picture/PictureUrl1 ne null and Address ne null and City ne null";

function formatRequestUrl(url, param, type = "other") {
  const { city, ...keys } =
    type === "other" ? Object.assign({}, defaultParam, param) : param;
  if (type === "other") {
    if (city) url += `/${city}`;

    if (keys.filter) {
      keys.filter += ` and ${defaultFilter}`;
    } else {
      keys.filter = defaultFilter;
    }

    if (keys.page) {
      keys.skip = (keys.page - 1) * 30;
      delete keys.page;
    }
  }

  return (
    url +
    "?$format=JSON" +
    Object.keys(keys).reduce((resp, key) => `${resp}&$${key}=${keys[key]}`, "")
  );
}
export const getScenicSpot = (parmas) =>
  GET(formatRequestUrl("/ScenicSpot", parmas));
export const getTourismActivity = (parmas) =>
  GET(formatRequestUrl("/Activity", parmas));
export const getRestaurant = (params) =>
  GET(formatRequestUrl("/Restaurant", params));
export const getHotel = (params) => GET(formatRequestUrl("/Hotel", params));
