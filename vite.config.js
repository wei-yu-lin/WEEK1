import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import path from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : "/WEEK1/",
  plugins: [
    vue(),
    Pages(),
    svgLoader({
      svgo: false,
    }),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  server: {
    proxy: {
      "/v2/Basic": {
        target: "https://link.motc.gov.tw/",
        secure: false,
        ws: true,
        changeOrigin: true,
      },
      "/v2/Tourism": {
        target: "https://ptx.transportdata.tw/MOTC/",
        secure: false,
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
