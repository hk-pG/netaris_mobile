import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "./");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  build: {
    outDir,
    rollupOptions: {
      input: {
        gyro: resolve(root, "src", "gyro", "index.html"),
        tetris: resolve(root, "src", "tetris", "index.html"),
        // "/": resolve(root, "index.html"),
      },
    },
  },
});
