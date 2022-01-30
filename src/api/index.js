import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";
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

    if (city) url += `/${city}`;

    if (!keys.filter) {
      keys.filter = defaultFilter;
    }

    if (keys.page) {
      keys.skip = (keys.page - 1) * 30;
      delete keys.page;
    }

  return (
    url +
    "?$format=JSON" +
    Object.keys(keys).reduce((resp, key) => `${resp}&$${key}=${keys[key]}`, "")
  );
}
function testUrl(url, param, type = "other") {
  const { city, ...keys } =
    type === "other" ? Object.assign({}, defaultParam, param) : param;

    if (city) url += `/${city}`;

    if (!keys.filter) {
      keys.filter = defaultFilter;
    }

    if (keys.page) {
      keys.skip = (keys.page - 1) * 30;
      delete keys.page;
    }

  console.log(
    url +
      "?$format=JSON" +
      Object.keys(keys).reduce(
        (resp, key) => `${resp}&$${key}=${keys[key]}`,
        ""
      )
  );

}
export const getScenicSpot = (parmas, type) =>
  GET(formatRequestUrl("/ScenicSpot", parmas, type));
export const getTourismActivity = (parmas) =>
  GET(formatRequestUrl("/Activity", parmas));
export const getRestaurant = (params, type) =>
  GET(formatRequestUrl("/Restaurant", params, type));
export const getHotel = (params, type) =>
  GET(formatRequestUrl("/Hotel", params, type));
export const yo = (parmas, type) => GET(testUrl("/ScenicSpot", parmas, type));
