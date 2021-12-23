import jsSHA from "jssha";
import axios from "axios";

function GetAuthHeader() {
  const AppID = import.meta.env.VITE_API_ID;
  const AppKey = import.meta.env.VITE_API_KEY;
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  const HMAC = ShaObj.getHMAC("B64");
  const Authorization = `hmac username="${AppID}", algorithm=\"hmac-sha1\", headers=\"x-date\", signature="${HMAC}"`;
  return {
    Authorization,
    "X-Date": GMTString,
  };
}

axios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    ...GetAuthHeader(),
  };

  return config;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function axiosRequest(url, method) {
  return new Promise((resovle, reject) =>
    axios({ method, url }).then(resovle).catch(reject)
  );
}
axios.defaults.baseURL = import.meta.env.VITE_API_PATH;

export const GET = (url) => axiosRequest(url, "get");
